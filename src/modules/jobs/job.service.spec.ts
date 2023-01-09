import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { Job } from '@entities/Job.entity';
import { Request } from '@entities/Request.entity';
import { Conversation } from '@entities/Conversation.entity';
import { getRepositoryProvider } from '@/common/utils/tests';
import UserDto from '@/modules/user/dto/user.dto';
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
      const job = { id: jobId } as Job;
      const leftJoins = ['category'];

      jest.spyOn(jobsService, 'findOne').mockResolvedValue(job);

      const value = await jobsService.getJobById(jobId);

      expect(jobsService.findOne).toBeCalledWith({ id: jobId }, leftJoins);
      expect(value).toEqual({
        job,
      });
    });

    it('job not found: should return null in job property', async (): Promise<void> => {
      const jobId = 10;

      jest.spyOn(jobsService, 'findOne').mockResolvedValue(null);

      expect(await jobsService.getJobById(jobId)).toEqual({
        job: null,
      });
    });
  });

  describe('getJobProposals', () => {
    it('should return job proposals', async (): Promise<void> => {
      const jobId = 1;
      const user = { id: 1 } as UserDto;
      const job = { id: jobId, owner: { id: 1 } } as Job;

      jest.spyOn(jobsService, 'findOne').mockResolvedValue(job);

      expect(await jobsService.getJobProposals(jobId, user)).toEqual({
        job,
        proposals: [],
      });
    });

    it('user is not job owner: should throw forbidden exception', async (): Promise<void> => {
      const jobId = 1;
      const user = { id: 1 } as UserDto;
      const job = { id: jobId, owner: { id: 2 } } as Job;

      jest.spyOn(jobsService, 'findOne').mockResolvedValue(job);

      expect(jobsService.getJobProposals(jobId, user)).rejects.toEqual(
        new ForbiddenException(),
      );
    });
  });

  describe('getAvailableJobs', () => {
    it('should return array of jobs without invite', async (): Promise<void> => {
      const user = { id: 5 } as UserDto;
      const job = { id: 2 } as Job;
      const freelancerId = 4 as number;

      jest.spyOn(jobsService, 'getAvailableJobs').mockResolvedValue([job]);

      expect(await jobsService.getAvailableJobs(user, freelancerId)).toEqual([
        job,
      ]);
    });

    it('jobs not found: should return empty array', async (): Promise<void> => {
      const user = { id: 5 } as UserDto;
      const freelancerId = 4;

      jest.spyOn(jobsService, 'getAvailableJobs').mockResolvedValue([]);

      expect(await jobsService.getAvailableJobs(user, freelancerId)).toEqual(
        [],
      );
    });
  });

  describe('getJobsWithoutOffer', () => {
    it('should return array of jobs without offer', async (): Promise<void> => {
      const user = { id: 5 } as UserDto;
      const job = { id: 2 } as Job;
      const freelancerId = 4 as number;

      jest
        .spyOn(jobsService, 'filterJobsWithoutOffer')
        .mockResolvedValue([job]);

      expect(
        await jobsService.filterJobsWithoutOffer(user, freelancerId),
      ).toEqual([job]);
    });

    it('jobs not found: should return empty array ', async (): Promise<void> => {
      const user = { id: 5 } as UserDto;
      const freelancerId = 4;

      jest.spyOn(jobsService, 'filterJobsWithoutOffer').mockResolvedValue([]);

      expect(
        await jobsService.filterJobsWithoutOffer(user, freelancerId),
      ).toEqual([]);
    });
  });
});
