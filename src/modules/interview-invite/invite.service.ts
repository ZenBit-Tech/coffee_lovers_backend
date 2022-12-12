import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/modules/user/user.service';
import { Conversation } from '@/common/entities/Conversation.entity';
import { User } from '@/common/entities/User.entity';
import { ConversResponse } from './dto/conversations-freelancer.dto';

@Injectable()
export class InviteService {
  constructor(
    @Inject(UserService)
    private userService: UserService,

    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
  ) {}

  async checkChatAvailability(
    user: User,
    frId: number,
  ): Promise<ConversResponse | null> {
    try {
      const freelancer = await this.userService.getUserById(frId);
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
