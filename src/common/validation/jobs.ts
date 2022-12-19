import { Job } from '@entities/Job.entity';
import { User } from '@entities/User.entity';
import { ForbiddenException } from '@nestjs/common/exceptions/forbidden.exception';

export const isUserJobOwnerOfJob = (job: Job, user: User): void => {
  if (!(job && job.owner.id === user.id)) {
    throw new ForbiddenException();
  }
};
