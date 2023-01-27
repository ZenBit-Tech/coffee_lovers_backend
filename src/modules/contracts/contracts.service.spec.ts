import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryProvider, mockRepository } from '@/common/utils/tests';
import { Contract } from '@/common/entities/Contract.entity';
import { User } from '@/common/entities/User.entity';
import { Role } from '@/common/constants/entities';
import { ContractsService } from './contracts.service';

describe('ContractsService', () => {
  let contractsService: ContractsService;
  let jobOwner: User;
  let freelancer: User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContractsService, getRepositoryProvider(Contract)],
    }).compile();

    contractsService = module.get<ContractsService>(ContractsService);

    jobOwner = {
      id: 1,
      role: Role.JOBOWNER,
    } as User;

    freelancer = {
      id: 2,
      role: Role.FREELANCER,
    } as User;
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  describe('getActiveContracts', () => {
    jest.spyOn(mockRepository, 'createQueryBuilder');

    it('should return list of active contrcts in case user is Jobowner', async () => {
      const activeContracts = [
        {
          id: 3,
        },
      ];

      jest
        .spyOn(mockRepository.createQueryBuilder(), 'getMany')
        .mockReturnValue(activeContracts);

      const reseivedResponse = await contractsService.getActiveContracts(
        jobOwner,
      );
      expect(reseivedResponse).toEqual(activeContracts);
      expect(mockRepository.createQueryBuilder).toHaveBeenCalled();
      expect(mockRepository.createQueryBuilder().getMany).toHaveBeenCalled();
    });

    it('should return list of active contrcts in case user is Freelancer', async () => {
      const activeContracts = [
        {
          id: 3,
        },
      ];

      jest
        .spyOn(mockRepository.createQueryBuilder(), 'getMany')
        .mockReturnValue(activeContracts);

      const reseivedResponse = await contractsService.getActiveContracts(
        freelancer,
      );
      expect(reseivedResponse).toEqual(activeContracts);
      expect(mockRepository.createQueryBuilder).toHaveBeenCalled();
      expect(mockRepository.createQueryBuilder().getMany).toHaveBeenCalled();
    });

    it('should return empty array in case user contracts are absent', async () => {
      const emptyArray = [];

      jest
        .spyOn(mockRepository.createQueryBuilder(), 'getMany')
        .mockReturnValue(emptyArray);

      const reseivedResponse = await contractsService.getActiveContracts(
        freelancer,
      );
      expect(reseivedResponse).toEqual(emptyArray);
    });
  });

  describe('getClosedContracts', () => {
    jest.spyOn(mockRepository, 'createQueryBuilder');

    it('should return list of closed contrcts in case user is JobOwner', async () => {
      const closedContracts = [
        {
          id: 3,
        },
      ];

      jest
        .spyOn(mockRepository.createQueryBuilder(), 'getMany')
        .mockReturnValue(closedContracts);

      const reseivedResponse = await contractsService.getClosedContracts(
        jobOwner,
      );
      expect(reseivedResponse).toEqual(closedContracts);
      expect(mockRepository.createQueryBuilder).toHaveBeenCalled();
      expect(mockRepository.createQueryBuilder().getMany).toHaveBeenCalled();
    });

    it('should return list of closed contrcts in case user is freelancer', async () => {
      const closedContracts = [
        {
          id: 3,
        },
      ];

      jest
        .spyOn(mockRepository.createQueryBuilder(), 'getMany')
        .mockReturnValue(closedContracts);

      const reseivedResponse = await contractsService.getClosedContracts(
        freelancer,
      );
      expect(reseivedResponse).toEqual(closedContracts);
      expect(mockRepository.createQueryBuilder).toHaveBeenCalled();
      expect(mockRepository.createQueryBuilder().getMany).toHaveBeenCalled();
    });

    it('should return empty array in case user contracts are absent', async () => {
      const emptyArray = [];

      jest
        .spyOn(mockRepository.createQueryBuilder(), 'getMany')
        .mockReturnValue(emptyArray);

      const reseivedResponse = await contractsService.getClosedContracts(
        freelancer,
      );
      expect(reseivedResponse).toEqual(emptyArray);
    });
  });
});
