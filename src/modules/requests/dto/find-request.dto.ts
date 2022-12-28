import { RequestType } from '@constants/entities';
import { Job } from '@entities/Job.entity';
import { User } from '@entities/User.entity';

export default class FindRequestDto {
  id?: number;

  type?: RequestType;

  job?: Job;

  job_owner?: User;

  freelancer?: User;

  hourly_rate?: number;

  rejected?: boolean;
}
