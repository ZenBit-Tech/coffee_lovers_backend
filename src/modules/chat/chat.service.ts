import {
  Injectable,
  HttpException,
  InternalServerErrorException,
  ForbiddenException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Brackets } from 'typeorm';
import { Conversation } from '@entities/Conversation.entity';
import { Request } from '@entities/Request.entity';
import { RequestType, Role } from '@constants/entities';
import { Message } from '@entities/Message.entity';
import { UserColumns } from '@constants/chat';
import { User } from '@entities/User.entity';
import UserDto from '@/modules/user/dto/user.dto';
import { RequsetService } from '@/modules/requests/requset.service';
import CreateConversationDto from './dto/create-conversation.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { GetConversationsDto } from './dto/get-conversations.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
    @InjectRepository(Request)
    private requestRepository: Repository<Request>,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,

    @Inject(RequsetService)
    private requestService: RequsetService,
  ) {}

  async createConversation(
    user: User,
    payload: CreateConversationDto,
  ): Promise<void> {
    try {
      if (!user.role) {
        throw new ForbiddenException();
      }

      const findRequestQuery = this.requestRepository
        .createQueryBuilder('request')
        .where({
          type:
            user.role === Role.JOBOWNER
              ? RequestType.PROPOSAL
              : RequestType.INTERVIEW,
          job: { id: payload.job },
        });

      findRequestQuery.andWhere(
        `request.${
          user.role === Role.JOBOWNER
            ? UserColumns.FREELANCER
            : UserColumns.JOB_OWNER
        } = :userId`,
        {
          userId: payload.user,
        },
      );

      const requestCount = await findRequestQuery.getCount();

      if (!requestCount) {
        if (user.role === Role.FREELANCER) {
          const offer = await this.requestService.findOffer({
            freelancer: user,
            job: { id: payload.job },
          });
          if (!offer) {
            throw new ForbiddenException();
          }
        } else {
          throw new ForbiddenException();
        }
      }

      const conversationPayload = {
        job: { id: payload.job },
        freelancer: {
          id: user.role === Role.FREELANCER ? user.id : payload.user,
        },
        job_owner: {
          id: user.role === Role.JOBOWNER ? user.id : payload.user,
        },
      };

      const conversationCount = await this.conversationRepository
        .createQueryBuilder('conversation')
        .where(conversationPayload)
        .getCount();

      if (conversationCount) {
        throw new BadRequestException();
      }

      await this.conversationRepository
        .createQueryBuilder()
        .insert()
        .into(Conversation)
        .values([conversationPayload])
        .execute();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async createMessage(payload: CreateMessageDto, user: UserDto): Promise<void> {
    try {
      await this.messageRepository
        .createQueryBuilder()
        .insert()
        .into(Message)
        .values([
          {
            conversation: { id: payload.conversation },
            from: { id: user.id },
            message: payload.message,
            is_read: payload.is_read,
          },
        ])
        .execute();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getMessages(user: UserDto, conversation: number): Promise<Message[]> {
    try {
      const conversationCount = await this.conversationRepository
        .createQueryBuilder('conversation')
        .where({ id: conversation })
        .andWhere(
          new Brackets((qb) => {
            qb.where(
              `conversation.${UserColumns.FREELANCER} = :userId`,
            ).orWhere(`conversation.${UserColumns.JOB_OWNER} = :userId`, {
              userId: user.id,
            });
          }),
        )
        .getCount();

      if (!conversationCount) {
        throw new ForbiddenException();
      }

      const messages = await this.messageRepository
        .createQueryBuilder('message')
        .leftJoinAndSelect('message.from', 'from')
        .where({ conversation: { id: conversation } })
        .getMany();

      const newMessages = messages.filter((message) => !message.is_read);

      if (newMessages.length) {
        this.markMessagesAsRead(newMessages.map((message) => message.id));
      }

      return messages;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async getConversations(
    user: UserDto,
    params: GetConversationsDto,
  ): Promise<Conversation[]> {
    try {
      if (!user.role) {
        throw new ForbiddenException();
      }

      const conditions =
        user.role === Role.JOBOWNER
          ? { job_owner: user }
          : { freelancer: user };

      const userColumn =
        user.role === Role.JOBOWNER
          ? UserColumns.FREELANCER
          : UserColumns.JOB_OWNER;

      const query = this.conversationRepository
        .createQueryBuilder('conversation')
        .leftJoinAndSelect('conversation.job', 'job')
        .leftJoinAndMapOne(
          `conversation.user`,
          `conversation.${userColumn}`,
          userColumn,
        )
        .leftJoin(
          (qb) =>
            qb
              .from(Message, 'message')
              .select(['message.conversationId'])
              .addSelect('MAX(created_at)', 'last')
              .groupBy('conversationId'),
          'last_message',
          'last_message.conversationId = conversation.id',
        )
        .leftJoinAndMapOne(
          'conversation.last_message',
          'conversation.messages',
          'messages',
          'messages.conversation = conversation.id AND messages.created_at = last_message.last',
        )
        .loadRelationCountAndMap(
          'conversation.new_messages',
          'conversation.messages',
          'message',
          (qb) =>
            qb.where('message.is_read = false AND message.from != :user_id', {
              user_id: user.id,
            }),
        )
        .where(conditions);

      if (params.search) {
        query.andWhere(
          new Brackets((qb) => {
            qb.where('job.title LIKE :search').orWhere(
              `CONCAT(${userColumn}.first_name, ' ', ${userColumn}.last_name) LIKE :search`,
              {
                search: `%${params.search}%`,
              },
            );
          }),
        );
      }

      return await query.getMany();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async markMessagesAsRead(messages: number[]): Promise<void> {
    try {
      await this.messageRepository
        .createQueryBuilder()
        .update(Message)
        .set({ is_read: true })
        .where('id IN (:...messages)', { messages })
        .execute();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
