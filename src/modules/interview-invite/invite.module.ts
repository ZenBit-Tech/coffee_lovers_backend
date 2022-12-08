import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InviteController } from './invite.controller';
import { InviteService } from './invite.service';
import { Offer } from '@/common/entities/Offer.entity';
import { Conversation } from '@/common/entities/Conversation.entity';
import { Job } from '@/common/entities/Job.entity';
import { User } from '@/common/entities/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Offer, Conversation, Job, User])],
  controllers: [InviteController],
  providers: [InviteService],
})
export class InviteModule {}
