import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@entities/User.entity';
import UserDto from '@/modules/user/dto/user.dto';
import { ReqUser } from '@/modules/user/dto/get-user-dto.dto';
import { JobsController } from './job.controller';
import { JobsService } from './job.service';
import GetJobsDto from './dto/get-jobs.dto';

describe('JobsController', () => {
  let jobsController: JobsController;
  let reqUser: ReqUser;

  const mockJobService = {
    getJobById: jest.fn().mockImplementation((jobId: number) => ({
      id: jobId,
    })),
    getJobProposals: jest
      .fn()
      .mockImplementation((id: number, user: UserDto) => ({
        job: { id },
        proposals: [{ id: 1 }],
      })),
    getAvailableJobs: jest
      .fn()
      .mockImplementation((req: object, fr: string) => [
        {
          id: fr,
        },
      ]),

    filterJobsWithoutOffer: jest
      .fn()
      .mockImplementation((user: object, fr: string) => [
        {
          id: fr,
        },
      ]),
    findJobs: jest.fn().mockImplementation((params: GetJobsDto) => ({
      jobs: [],
      meta: {
        totalCount: 0,
      },
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

    reqUser = {
      user: {
        id: 1,
      } as User,
    };
  });

  describe('getJobById', () => {
    it('should return job by id', async (): Promise<void> => {
      const payload = { id: '1' };
      expect(await jobsController.getJobById(payload)).toEqual(
        mockJobService.getJobById(+payload.id),
      );

      expect(mockJobService.getJobById).toHaveBeenCalledWith(+payload.id);
    });
  });

  describe('getJobProposals', () => {
    it('should return job proposals', async (): Promise<void> => {
      const params = { id: '1' };
      expect(await jobsController.getJobProposals(reqUser, params)).toEqual(
        mockJobService.getJobProposals(+params.id, reqUser.user),
      );

      expect(mockJobService.getJobProposals).toHaveBeenCalledWith(
        +params.id,
        reqUser.user,
      );
    });
  });

  describe('Find jobs', () => {
    it('should call findJobs in user service with params', async () => {
      const params = { offset: 0, limit: 10 };
      await jobsController.findJobs(params);
      expect(mockJobService.findJobs).toHaveBeenCalledWith(params);
    });

    it('should return object with array of jobs and total count', async () => {
      const params = { offset: 0, limit: 10 };
      const data = await jobsController.findJobs(params);

      expect(data).not.toEqual([]);
      expect(data).toHaveProperty('jobs');
      expect(data).toHaveProperty('meta');
      expect(data.meta).toHaveProperty('totalCount');
    });
  });
});
