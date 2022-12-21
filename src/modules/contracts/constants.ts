import { Role } from '@/common/constants/entities';
import { User } from '@/common/entities/User.entity';

export const checkAnotherRole = (user: User) =>
  user.role === Role.FREELANCER ? 'job_owner' : 'freelancer';

export const checkUserRole = (user: User) =>
  user.role === Role.JOBOWNER ? 'job_owner' : 'freelancer';
