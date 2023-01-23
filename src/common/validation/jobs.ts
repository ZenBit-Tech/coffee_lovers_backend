import { Job } from '@entities/Job.entity';
import { User } from '@entities/User.entity';
import { ForbiddenException } from '@nestjs/common/exceptions/forbidden.exception';
import { Offer } from '@entities/Offer.entity';

export const isUserJobOwnerOfJob = (job: Job, user: User): void => {
  if (!(job && job.owner.id === user.id)) {
    throw new ForbiddenException();
  }
};

export const isUserFreelancer = (offer: Offer, user: User): void => {
  if (offer.freelancer.id !== user.id) {
    throw new ForbiddenException();
  }
};
