import { Repository } from 'typeorm';
import { Request } from '@entities/Request.entity';
import { Conversation } from '@entities/Conversation.entity';
import { Job } from '@entities/Job.entity';
import { JobsController } from './job.controller';
import { JobsService } from './job.service';
import getJobByIdResponseDto from './dto/get-job-response.dto';

describe('JobsController', () => {
  let jobsController: JobsController;
  let jobsService: JobsService;

  let jobRepository: Repository<Job>;
  let requestRepository: Repository<Request>;
  let conversationRepository: Repository<Conversation>;

  beforeEach(async () => {
    jobsService = new JobsService(
      jobRepository,
      requestRepository,
      conversationRepository,
    );
    jobsController = new JobsController(jobsService);
  });

  describe('getJobById', () => {
    it('should return job by id', async (): Promise<void> => {
      const result = { job: { id: 1 } } as getJobByIdResponseDto;

      jest
        .spyOn(jobsService, 'getJobById')
        .mockImplementation(async () => result);

      expect(await jobsController.getJobById({ id: 1 })).toStrictEqual(result);
    });
  });
});
