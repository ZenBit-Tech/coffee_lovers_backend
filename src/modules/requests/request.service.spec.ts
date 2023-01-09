import { Test } from '@nestjs/testing';
import { getRepositoryProvider, mockRepository } from '@utils/tests';
import { ConfigService } from '@nestjs/config';
import { RequsetService } from './requset.service';
import { UserService } from '../user/user.service';
import { JobsService } from '../jobs/job.service';
import {
  addRequestBody,
  mockFreelancerId,
  mockJobId,
} from './mockData/requestData';
import { Job } from '@/common/entities/Job.entity';
import { User } from '@/common/entities/User.entity';
import { FileService } from '../file/file.service';
import getJobByIdResponseDto from '../jobs/dto/get-job-response.dto';
import OfferBody from './dto/offer-body-dto copy';
import { Request } from '@/common/entities/Request.entity';
import { Offer } from '@/common/entities/Offer.entity';
import { Contract } from '@/common/entities/Contract.entity';
import { freelancerId } from './constants/mock-test-const';
import ReqBody from './dto/request-body-dto';

describe('UserService', () => {
  let requestService: RequsetService;
  let jobService: JobsService;
  let userService: UserService;

  const mockConfigService = {
    get: () => '',
  };

  const mockJobService = {
    getJobById: (id: number) =>
      ({
        id,
      } as Job),
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
        UserService,
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
      const currentUser = { id: 7 } as User;
      const jobId = 6;
      const frelancer = { id: mockFreelancerId } as User;
      const jobRes = { job: { id: jobId } } as getJobByIdResponseDto;
      const offerBody = { hourly_rate: 4 } as OfferBody;

      jest.spyOn(mockRepository, 'createQueryBuilder');
      jest.spyOn(jobService, 'getJobById').mockResolvedValue(jobRes);
      jest.spyOn(userService, 'getUserById').mockResolvedValue(frelancer);
      jest.spyOn(requestService, 'addOffer').mockResolvedValue();

      await requestService.addOffer(
        currentUser,
        jobId,
        freelancerId,
        offerBody,
      );

      expect(requestService.addOffer).toBeCalledWith(
        currentUser,
        jobId,
        freelancerId,
        offerBody,
      );
      expect(requestService.addOffer).toBeCalledTimes(1);
    });
  });

  describe('addRequest', () => {
    it('conversations not found: should call checkChatAvailability , should get response object with freelancer and empty array', async (): Promise<void> => {
      const currentUser = { id: 7 } as User;
      const jobId = 6;
      const frelancer = { id: mockFreelancerId } as User;
      const jobRes = { job: { id: jobId } } as getJobByIdResponseDto;
      const reqBody = { hourly_rate: 4 } as ReqBody;

      jest.spyOn(mockRepository, 'createQueryBuilder');
      jest.spyOn(jobService, 'getJobById').mockResolvedValue(jobRes);
      jest.spyOn(userService, 'getUserById').mockResolvedValue(frelancer);
      jest.spyOn(requestService, 'addRequest').mockResolvedValue();

      await requestService.addRequest(
        currentUser,
        reqBody,
        freelancerId,
        jobId,
      );

      expect(requestService.addRequest).toBeCalledWith(
        currentUser,
        reqBody,
        freelancerId,
        jobId,
      );
      expect(requestService.addRequest).toBeCalledTimes(1);
    });
  });
});
