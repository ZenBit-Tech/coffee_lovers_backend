import { Test, TestingModule } from '@nestjs/testing';
import { JobsController } from './job.controller';
import { JobsService } from './job.service';

describe('JobsController', () => {
  let jobsController: JobsController;

  const mockJobService = {
    getJobById: jest.fn().mockImplementation((jobId: number) => ({
      id: jobId,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobsController],
      providers: [JobsService],
    })
      .overrideProvider(JobsService)
      .useValue(mockJobService)
      .compile();

    jobsController = module.get<JobsController>(JobsController);
  });

  describe('getJobById', () => {
    it('should return job by id', async (): Promise<void> => {
      const payload = { id: '1' };
      expect(await jobsController.getJobById(payload)).toStrictEqual({
        id: +payload.id,
      });
    });
  });
});
