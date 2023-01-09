import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@entities/User.entity';
import UserDto from '@/modules/user/dto/user.dto';
import { ReqUser } from '@/modules/user/dto/get-user-dto.dto';
import { JobsController } from './job.controller';
import { JobsService } from './job.service';

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

  describe('getAvailableJobs', () => {
    it('should return jobs without invite', async (): Promise<void> => {
      const req = { user: { id: 4 } } as ReqUser;
      const freelancer = '4' as string;
      expect(await jobsController.getUserJobs(req, freelancer)).toEqual(
        mockJobService.getAvailableJobs(req, +freelancer),
      );

      expect(mockJobService.getAvailableJobs).toHaveBeenCalledWith(
        req,
        +freelancer,
      );
    });
  });

  describe('getJobsMissingOffer', () => {
    it('should return jobs without offer', async (): Promise<void> => {
      const req = { user: { id: 4 } } as ReqUser;
      const freelancer = '4' as string;
      expect(await jobsController.getUserJobs(req, freelancer)).toEqual(
        mockJobService.filterJobsWithoutOffer(req, +freelancer),
      );

      expect(mockJobService.filterJobsWithoutOffer).toHaveBeenCalledWith(
        req,
        +freelancer,
      );
    });
  });
});
