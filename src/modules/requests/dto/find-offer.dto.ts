import { OfferStatus } from '@constants/entities';
import { Job } from '@entities/Job.entity';
import { User } from '@entities/User.entity';

export default class FindOfferDto {
  id?: number;

  job?: Job | { id: number };

  job_owner?: User | { id: number };

  freelancer?: User | { id: number };

  hourly_rate?: number;

  status?: OfferStatus;
}
