import { Test } from '@nestjs/testing';
import { getRepositoryProvider, mockRepository } from '@utils/tests';
import { ConfigService } from '@nestjs/config';
import { UserService } from '@/modules/user/user.service';
import { JobsService } from '@/modules/jobs/job.service';
import { Job } from '@/common/entities/Job.entity';
import { User } from '@/common/entities/User.entity';
import { FileService } from '@/modules/file/file.service';
import { Request } from '@/common/entities/Request.entity';
import { Offer } from '@/common/entities/Offer.entity';
import { Contract } from '@/common/entities/Contract.entity';
import {
  mockFreelancerOfTypeUser,
  mockJobOwnerOfTypeUser,
} from '@/common/mocks/users';
import { mockJobById, mockJobOfTypeJob, mockOffer1 } from '@/common/mocks/jobs';
import { mockRquestBody } from '@/common/mocks/request';
import { freelancerId } from './constants/mock-test-const';
import { RequsetService } from './requset.service';

describe('UserService', () => {
  let requestService: RequsetService;
  let jobService: JobsService;
  let userService: UserService;

  const mockConfigService = {
    get: () => '',
  };

  const mockJobService = {
    getJobById: (id: number) => ({
      id,
    }),
  };

  const mockUserService = {
    getUserById: (id: number) => ({
      id,
    }),
  };
  const mockFileService = {};

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        RequsetService,
        getRepositoryProvider(Request),
        getRepositoryProvider(User),
        getRepositoryProvider(Job),
        getRepositoryProvider(Offer),
        getRepositoryProvider(Contract),

        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: FileService,
          useValue: mockFileService,
        },
        {
          provide: JobsService,
          useValue: mockJobService,
        },
      ],
    }).compile();

    requestService = moduleRef.get<RequsetService>(RequsetService);
    jobService = moduleRef.get<JobsService>(JobsService);
    userService = moduleRef.get<UserService>(UserService);
  });
  afterEach(async () => {
    jest.clearAllMocks();
  });

  describe('addOffer', () => {
    it('conversations not found: should call checkChatAvailability , should get response object with freelancer and empty array', async (): Promise<void> => {
      jest.spyOn(mockRepository, 'createQueryBuilder');
      jest.spyOn(jobService, 'getJobById').mockResolvedValue(mockJobById);
      jest
        .spyOn(userService, 'getUserById')
        .mockResolvedValue(mockFreelancerOfTypeUser);
      jest.spyOn(requestService, 'addOffer').mockResolvedValue();

      await requestService.addOffer(
        mockJobOwnerOfTypeUser,
        mockJobOfTypeJob.id,
        freelancerId,
        mockOffer1,
      );

      expect(requestService.addOffer).toBeCalledWith(
        mockJobOwnerOfTypeUser,
        mockJobOfTypeJob.id,
        freelancerId,
        mockOffer1,
      );
      expect(requestService.addOffer).toBeCalledTimes(1);
    });
  });

  describe('addRequest', () => {
    it('conversations not found: should call checkChatAvailability , should get response object with freelancer and empty array', async (): Promise<void> => {
      jest.spyOn(mockRepository, 'createQueryBuilder');
      jest.spyOn(jobService, 'getJobById').mockResolvedValue(mockJobById);
      jest
        .spyOn(userService, 'getUserById')
        .mockResolvedValue(mockFreelancerOfTypeUser);
      jest.spyOn(requestService, 'addRequest').mockResolvedValue();

      await requestService.addRequest(
        mockJobOwnerOfTypeUser,
        mockRquestBody,
        mockFreelancerOfTypeUser.id,
        mockJobOfTypeJob.id,
      );

      expect(requestService.addRequest).toBeCalledWith(
        mockJobOwnerOfTypeUser,
        mockRquestBody,
        mockFreelancerOfTypeUser.id,
        mockJobOfTypeJob.id,
      );
      expect(requestService.addRequest).toBeCalledTimes(1);
    });
  });
});
