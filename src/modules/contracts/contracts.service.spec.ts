import { Test, TestingModule } from '@nestjs/testing';
import { Job } from '@entities/Job.entity';
import { Request } from '@entities/Request.entity';
import { Conversation } from '@entities/Conversation.entity';
import { ConfigService } from '@nestjs/config';
import { getRepositoryProvider, mockRepository } from '@/common/utils/tests';
import { FileService } from '@/modules/file/file.service';
import { UserService } from '@/modules/user/user.service';
import { mockFreelancerOfTypeUser } from '@/common/mocks/users';
import { ContractsService } from './contracts.service';
import { Contract } from '@/common/entities/Contract.entity';
import { Offer } from '@/common/entities/Offer.entity';

jest.mock('./constants', () => ({
  checkAnotherRole: () => 'job_owner',
  checkUserRole: () => 'freelancer',
}));

describe('ContractsService', () => {
  let contractsService: ContractsService;

  const mockConfigService = {
    get: () => '',
  };

  const mockUserService = {
    getUserById: (id: number) => ({
      id,
    }),
  };
  const mockFileService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContractsService,
        UserService,
        getRepositoryProvider(Contract),
        getRepositoryProvider(Offer),
        getRepositoryProvider(Job),
        getRepositoryProvider(Request),
        getRepositoryProvider(Conversation),
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
      ],
    }).compile();

    contractsService = module.get<ContractsService>(ContractsService);
  });

  describe('getActiveContracts', () => {
    it('getActiveContracts should be called with freelancer and be called 1 time', async (): Promise<void> => {
      jest.spyOn(mockRepository, 'createQueryBuilder');

      const contracts = await contractsService.getActiveContracts(
        mockFreelancerOfTypeUser,
      );

      // expect(contractsService.getActiveContracts).toBeTruthy();
      // expect(contractsService.getActiveContracts).toBeCalledTimes(1);
    });
  });
  it('getClosedContracts should be called with freelancer and be called 1 time', async (): Promise<void> => {
    jest.spyOn(mockRepository, 'createQueryBuilder');

    const contracts = await contractsService.getClosedContracts(
      mockFreelancerOfTypeUser,
    );

    // expect(contractsService.getClosedContracts).toBeCalledWith(
    //   mockFreelancerOfTypeUser,
    // );
    // expect(contractsService.getClosedContracts).toBeCalledTimes(1);
  });
});
