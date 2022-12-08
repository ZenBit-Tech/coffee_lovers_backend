import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/modules/user/user.module';
import { Offer } from '@/common/entities/Offer.entity';
import { Conversation } from '@/common/entities/Conversation.entity';
import { Job } from '@/common/entities/Job.entity';
import { User } from '@/common/entities/User.entity';
import { InviteController } from './invite.controller';
import { InviteService } from './invite.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Offer, Conversation, Job, User]),
    UserModule,
  ],
  controllers: [InviteController],
  providers: [InviteService],
})
export class InviteModule {}
