import { OfferStatus } from '@constants/entities';
import { Job } from '@entities/Job.entity';
import { User } from '@entities/User.entity';

export default class FindOfferDto {
  id?: number;

  job?: Job;

  job_owner?: User;

  freelancer?: User;

  hourly_rate?: number;

  status?: OfferStatus;
}
