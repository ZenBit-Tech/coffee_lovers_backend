import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from '@/common/entities/Job.entity';

import { JobsController } from './freelancers.controller';
import { JobsService } from './freelancers.service';
import { User } from '@/common/entities/User.entity';
import { UserModule } from '@/modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forFeature([Job, User]),
    UserModule,
  ],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
