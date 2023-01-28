import { Test, TestingModule } from '@nestjs/testing';
import { InternalServerErrorException } from '@nestjs/common';
import { getRepositoryProvider, mockRepository } from '@/common/utils/tests';
import { Contract } from '@/common/entities/Contract.entity';
import { User } from '@/common/entities/User.entity';
import { ContractStatus, Role } from '@/common/constants/entities';
import { ContractsService } from './contracts.service';
import { oneTimeCall } from './constants';

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

  describe('CloseContract', () => {
    jest.spyOn(mockRepository, 'createQueryBuilder');

    it('should set status to closed for contract in case freelancer is owner and want to close contract', async () => {
      const activeContract = {
        id: 3,
        status: ContractStatus.ACTIVE,
        offer: {
          id: 34,
          job_owner: { id: 36 },
          freelancer,
        },
      } as Contract;

      jest.spyOn(contractsService, 'findOne').mockResolvedValue(activeContract);
      jest
        .spyOn(contractsService, 'setContractStatus')
        .mockImplementation(() => null);

      await contractsService.closeContract(freelancer, activeContract.id);
      expect(contractsService.findOne).toBeCalledTimes(oneTimeCall);
      expect(contractsService.setContractStatus).toBeCalledTimes(oneTimeCall);
    });

    it('should set status to closed for contract in case jobOwner is owner and want to close contract', async () => {
      const activeContract = {
        id: 3,
        status: ContractStatus.ACTIVE,
        offer: {
          id: 34,
          job_owner: jobOwner,
          freelancer: { id: 9 },
        },
      } as Contract;

      jest.spyOn(contractsService, 'findOne').mockResolvedValue(activeContract);
      jest
        .spyOn(contractsService, 'setContractStatus')
        .mockImplementation(() => null);

      await contractsService.closeContract(jobOwner, activeContract.id);
      expect(contractsService.findOne).toBeCalledTimes(oneTimeCall);
      expect(contractsService.setContractStatus).toBeCalledTimes(oneTimeCall);
    });

    it('should throw internal server error in case something went wrong', async () => {
      const activeContract = {
        id: 3,
        status: ContractStatus.ACTIVE,
        offer: {
          id: 34,
          job_owner: jobOwner,
          freelancer: { id: 9 },
        },
      } as Contract;

      jest.spyOn(contractsService, 'findOne').mockResolvedValue(activeContract);

      await contractsService.closeContract(jobOwner, activeContract.id);
      expect(contractsService.closeContract).rejects.toEqual(
        new InternalServerErrorException(),
      );
    });
  });

  describe('SetContractStatus', () => {
    jest.spyOn(mockRepository, 'createQueryBuilder');

    it('should set status to closed ', async () => {
      const activeContract = {
        id: 3,
        status: ContractStatus.ACTIVE,
      } as Contract;

      await contractsService.setContractStatus(
        activeContract.id,
        ContractStatus.CLOSED,
      );

      expect(mockRepository.createQueryBuilder).toBeCalledTimes(oneTimeCall);
    });

    it('should set status to active ', async () => {
      const activeContract = {
        id: 3,
        status: null,
      } as Contract;

      await contractsService.setContractStatus(
        activeContract.id,
        ContractStatus.ACTIVE,
      );

      expect(mockRepository.createQueryBuilder).toBeCalledTimes(oneTimeCall);
    });

    it('should return internal server error in case something went wrong', async () => {
      const activeContract = {
        id: 3,
        status: null,
      } as Contract;

      await contractsService.setContractStatus(
        activeContract.id,
        ContractStatus.ACTIVE,
      );

      expect(contractsService.setContractStatus).rejects.toEqual(
        new InternalServerErrorException(),
      );
    });
  });
});
