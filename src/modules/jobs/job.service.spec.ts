import { Test, TestingModule } from '@nestjs/testing';
import { Job } from '@entities/Job.entity';
import { Request } from '@entities/Request.entity';
import { Conversation } from '@entities/Conversation.entity';
import { getRepositoryProvider } from '@/common/utils/tests';
import { JobsService } from './job.service';

describe('JobsService', () => {
  let jobsService: JobsService;

  const mockJobRepository = {};
  const mockRequestRepository = {};
  const mockConversationRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobsService,
        getRepositoryProvider(Job, mockJobRepository),
        getRepositoryProvider(Request, mockRequestRepository),
        getRepositoryProvider(Conversation, mockConversationRepository),
      ],
    }).compile();

    jobsService = module.get<JobsService>(JobsService);
  });

  it('should be defined', () => {
    expect(jobsService).toBeDefined();
  });
});
