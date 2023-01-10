import { RequestType } from '@/common/constants/entities';

export const addRequestBody = {
  type: RequestType.INTERVIEW,
  hourly_rate: 20,
  reject: false,
  cover_letter: 'It is my cover letter',
};

export const mockFreelancerId = 4;
export const mockJobId = 25;
export const mockJobOwnerId = 25;
