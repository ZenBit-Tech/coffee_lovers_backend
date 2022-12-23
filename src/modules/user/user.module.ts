import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from '@entities/Request.entity';
import { forwardRef } from '@nestjs/common/utils';
import { User } from '@/common/entities/User.entity';
import { WorkHistory } from '@/common/entities/WorkHistory.entity';
import { Education } from '@/common/entities/Education.entity';
import { UserService } from '@/modules/user/user.service';
import { UserController } from '@/modules/user/user.controller';
import { MailModule } from '@/modules/mail/mail.module';
import { FileModule } from '@/modules/file/file.module';
import { Job } from '@/common/entities/Job.entity';
import { Category } from '@/common/entities/Category.entity';
import { Favorites } from '@/common/entities/Favorites.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      WorkHistory,
      Education,
      Job,
      Category,
      Request,
      Favorites,
    ]),
    forwardRef(() => MailModule),
    FileModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
