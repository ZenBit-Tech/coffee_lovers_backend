import { Repository } from 'typeorm';
import { Job } from '@/common/entities/Job.entity';
import { JobsController } from './job.controller';
import { JobsService } from './job.service';
import { UserService } from '../user/user.service';

describe('JobsController', () => {
  let jobsController: JobsController;
  let jobsService: JobsService;
  let userService: UserService;
  let jobRepo: Repository<Job>;

  beforeEach(async () => {
    jobsService = new JobsService(userService, jobRepo);
    jobsController = new JobsController(jobsService);
  });

  describe('getOneJob', () => {
    it('should return job by id', async (): Promise<void> => {
      const result = { hourly_rate: 4 };
      jest
        .spyOn(jobsService, 'getOneJob')
        .mockImplementation(async () => result);
      expect(await jobsController.getOneJob({ id: '5638' })).toStrictEqual(
        result,
      );
    });
  });
});
