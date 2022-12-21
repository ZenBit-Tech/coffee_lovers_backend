import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from '@entities/Job.entity';
import { Request } from '@entities/Request.entity';
import { PropertiesModule } from '@/modules/properties/properties.module';
import { UserModule } from '@/modules/user/user.module';
import { User } from '@/common/entities/User.entity';
import { Conversation } from '@/common/entities/Conversation.entity';
import { Offer } from '@/common/entities/Offer.entity';
import { JobsController } from './job.controller';
import { JobsService } from './job.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forFeature([Job, Offer, Request, User, Conversation]),
    UserModule,
    PropertiesModule,
  ],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
