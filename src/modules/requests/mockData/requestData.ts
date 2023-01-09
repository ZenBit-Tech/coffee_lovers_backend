import {
  AvailableTime,
  DurationAmount,
  EnglishLevel,
  JobStatus,
  RequestType,
} from '@/common/constants/entities';
import { Category } from '@/common/entities/Category.entity';
import { User } from '@/common/entities/User.entity';
import getJobByIdResponseDto from '@/modules/jobs/dto/get-job-response.dto';

export const addRequestBody = {
  type: RequestType.INTERVIEW,
  hourly_rate: 20,
  reject: false,
  cover_letter: 'It is my cover letter',
};

export const mockFreelancerId = 4;
export const mockJobId = 25;
export const mockJobOwnerId = 25;
export const jobResponse: getJobByIdResponseDto = {
  job: {
    id: 1,
    title: 'Test job',
    description: 'This is test job',
    hourly_rate: 50,
    available_time: AvailableTime.FULL_TIME,
    english_level: EnglishLevel.INTERMEDIATE,
    created_at: new Date(),
    owner: {
      id: 1,
      email: 'johndoe@test.com',
      first_name: 'John',
      last_name: 'Doe',
    } as User,
    category: {
      id: 1,
      name: 'JavaScript',
    } as Category,
    duration: 4,
    duration_amount: DurationAmount.MONTH,
    status: JobStatus.FINISHED,
    skills: [],
    conversations: [],
    requests: [],
    offers: [],
  },
};
