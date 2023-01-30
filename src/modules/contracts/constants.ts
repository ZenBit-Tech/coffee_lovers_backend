import { Role } from '@/common/constants/entities';
import { User } from '@/common/entities/User.entity';

const firstElement = 0;
export const oneTimeCall = 1;

export const checkAnotherRole = (user: User): string | null => {
  if (user.role === Role.FREELANCER) {
    return 'job_owner';
  }
  if (user.role === Role.JOBOWNER) {
    return 'freelancer';
  }

  return null;
};

export const checkUserRole = (user: User): string | null => {
  if (user.role === Role.JOBOWNER) {
    return 'job_owner';
  }
  if (user.role === Role.FREELANCER) {
    return 'freelancer';
  }

  return null;
};

export const dateFormat = () =>
  new Date(Date.now()).toLocaleString().split(',')[firstElement];
