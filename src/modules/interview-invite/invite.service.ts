import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from '@/common/entities/Conversation.entity';
import { User } from '@/common/entities/User.entity';
import { ConversResponse } from './dto/conversations-freelancer.dto';

@Injectable()
export class InviteService {
  constructor(
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUserById(id: number): Promise<User> {
    try {
      const userInfo = await this.userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id })
        .getOne();

      return userInfo;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async checkChatAvailability(
    user: User,
    frId: number,
  ): Promise<ConversResponse | null> {
    try {
      const freelancer = await this.getUserById(frId);
      const data = await this.conversationRepository
        .createQueryBuilder('conversations')
        .leftJoin('conversations.freelancer', 'freelancer')
        .leftJoinAndSelect('conversations.job', 'job')
        .leftJoinAndSelect('job.owner', 'owner')
        .where('freelancer.id = :frId', {
          frId,
        })
        .andWhere('owner.id = :id', {
          id: user.id,
        })
        .getMany();

      return { data, freelancer };
    } catch (error) {
      throw new HttpException(
        'Internal error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
