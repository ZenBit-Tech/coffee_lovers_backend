import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from '@/common/entities/Job.entity';
import { Request } from '@/common/entities/Request.entity';
import { User } from '@/common/entities/User.entity';
import { Offer } from '@/common/entities/Offer.entity';
import { JobsService } from '@/modules/jobs/job.service';
import { JobsModule } from '@/modules/jobs/job.module';
import { UserModule } from '@/modules/user/user.module';
import { RequsetService } from './requset.service';
import { RequstController } from './requst.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Request, Job, User, Offer]),
    UserModule,
    JobsModule,
  ],
  controllers: [RequstController],
  providers: [RequsetService],
})
export class RequestModule {}
