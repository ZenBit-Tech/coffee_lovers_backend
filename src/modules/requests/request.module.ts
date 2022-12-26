import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from '@entities/Job.entity';
import { Request } from '@entities/Request.entity';
import { User } from '@entities/User.entity';
import { Offer } from '@entities/Offer.entity';
import { Contract } from '@entities/Contract.entity';
import { JobsService } from '@/modules/jobs/job.service';
import { UserModule } from '@/modules/user/user.module';
import { RequsetService } from './requset.service';
import { RequstController } from './requst.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Request, Job, User, Offer, Contract]),
    UserModule,
  ],
  controllers: [RequstController],
  providers: [JobsService, RequsetService],
})
export class RequestModule {}
