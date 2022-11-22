import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from '@/common/entities/Job.entity';

import { JobsController } from './job.controller';
import { JobsService } from './job.service';
import { User } from '@/common/entities/User.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forFeature([Job, User]),
  ],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}