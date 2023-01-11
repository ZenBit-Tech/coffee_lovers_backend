import {
  AvailableTime,
  ContractStatus,
  DurationAmount,
  EnglishLevel,
  JobStatus,
  OfferStatus,
} from '@constants/entities';
import getJobByIdResponseDto from '@/modules/jobs/dto/get-job-response.dto';
import { Job } from '@/common/entities/Job.entity';
import { mockJobOwnerOfTypeUser } from './users';
import { Category } from '@/common/entities/Category.entity';

export const mockJob1 = {
  id: 1,
  title: 'Freelance platform',
  description: 'Create freelance platform',
  hourly_rate: 30,
  available_time: AvailableTime.FULL_TIME,
  english_level: EnglishLevel.INTERMEDIATE,
  status: JobStatus.IN_PROGRESS,
  created_at: '2022-12-06T09:57:29.161Z',
};

export const mockContract1 = {
  id: 1,
  created_at: '2022-12-26T14:08:47.807Z',
  status: ContractStatus.ACTIVE,
  end: '2022-12-26T14:08:47.807Z',
};

export const mockOffer1 = {
  id: 1,
  hourly_rate: 30,
  status: OfferStatus.ACCEPTED,
  start: '2022-12-26T12:29:05.652Z',
  created_at: '2022-12-21T15:38:55.906Z',
};

export const mockCategoryOfType: Category = {
  id: 5,
  name: 'Full-stack',
  jobs: [],
  user: [],
};

export const mockJobOfTypeJob: Job = {
  id: 13,
  title: 'Create landing',
  description: 'Here is job description',
  hourly_rate: 12,
  available_time: AvailableTime.FULL_TIME,
  english_level: EnglishLevel.INTERMEDIATE,
  duration: 13,
  duration_amount: DurationAmount.MONTH,
  status: JobStatus.PENDING,
  created_at: new Date(),
  owner: mockJobOwnerOfTypeUser,
  category: mockCategoryOfType,
  skills: [],
  conversations: [],
  requests: [],
  offers: [],
};

export const mockJobById: getJobByIdResponseDto = {
  job: mockJobOfTypeJob,
};
