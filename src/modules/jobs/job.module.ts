import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from '@entities/Job.entity';
import { Request } from '@entities/Request.entity';
import { PropertiesModule } from '@/modules/properties/properties.module';
import { UserModule } from '@/modules/user/user.module';

import { JobsController } from './job.controller';
import { JobsService } from './job.service';
import { User } from '@/common/entities/User.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forFeature([Job, Request, User]),
    UserModule,
    PropertiesModule,
  ],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
