import { Test, TestingModule } from '@nestjs/testing';
import { Job } from '@entities/Job.entity';
import { Request } from '@entities/Request.entity';
import { Conversation } from '@entities/Conversation.entity';
import { getRepositoryProvider } from '@/common/utils/tests';
import { JobsService } from './job.service';

describe('JobsService', () => {
  let jobsService: JobsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobsService,
        getRepositoryProvider(Job),
        getRepositoryProvider(Request),
        getRepositoryProvider(Conversation),
      ],
    }).compile();

    jobsService = module.get<JobsService>(JobsService);
  });

  describe('getJobById', () => {
    it('should return job by id', async (): Promise<void> => {
      const jobId = 1;
      const job = { id: 1 } as Job;
      const leftJoins = ['category'];

      jest.spyOn(jobsService, 'findOne').mockResolvedValue(job);

      const value = await jobsService.getJobById(job.id);

      expect(jobsService.findOne).toBeCalledWith({ id: jobId }, leftJoins);
      expect(value).toEqual({
        job,
      });
    });
  });
});
