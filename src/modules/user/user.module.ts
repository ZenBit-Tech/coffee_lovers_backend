import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/common/entities/User.entity';
import { WorkHistory } from '@/common/entities/WorkHistory.entity';
import { Education } from '@/common/entities/Education.entity';
import { UserService } from '@/modules/user/user.service';
import { UserController } from '@/modules/user/user.controller';
import { MailModule } from '@/modules/mail/mail.module';
import { FileModule } from '@/modules/file/file.module';
import { JobsModule } from '../jobs/job.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, WorkHistory, Education]),
    MailModule,
    FileModule,
    JobsModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
