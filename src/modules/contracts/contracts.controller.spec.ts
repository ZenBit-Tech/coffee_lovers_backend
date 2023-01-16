import { Test, TestingModule } from '@nestjs/testing';
import { mockRquestUser } from '@/common/mocks/request';
import { ContractsController } from './contracts.controller';
import { ContractsService } from './contracts.service';
import { User } from '@/common/entities/User.entity';

describe('InviteController', () => {
  let contractsController: ContractsController;
  let contractsService: ContractsService;

  const mockContractsService = {
    getActiveContracts: jest.fn().mockImplementation((user: User) => [
      {
        id: 3,
      },
    ]),
    getClosedContracts: jest.fn().mockImplementation((user: User) => [
      {
        id: 4,
      },
    ]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContractsController],
      providers: [ContractsService],
    })
      .overrideProvider(ContractsService)
      .useValue(mockContractsService)
      .compile();

    contractsController = module.get<ContractsController>(ContractsController);
    contractsService = module.get<ContractsService>(ContractsService);
  });

  describe('getContracts', () => {
    it('should get all active contracts and be called with user', async (): Promise<void> => {
      const contractsActiveRes = [{ id: 3 }];
      expect(
        await contractsController.getActiveContractsFreelancer(mockRquestUser),
      ).toEqual(mockContractsService.getActiveContracts(mockRquestUser.user));

      expect(mockContractsService.getActiveContracts).toHaveBeenCalledWith(
        mockRquestUser.user,
      );

      expect(
        await contractsController.getActiveContractsFreelancer(mockRquestUser),
      ).toEqual(contractsActiveRes);
    });

    it('should get all closed contracts and be called with user', async (): Promise<void> => {
      const contractsClosedRes = [{ id: 4 }];

      expect(
        await contractsController.getClosedContractsFreelancer(mockRquestUser),
      ).toEqual(mockContractsService.getClosedContracts(mockRquestUser.user));

      expect(mockContractsService.getClosedContracts).toHaveBeenCalledWith(
        mockRquestUser.user,
      );

      expect(
        await contractsController.getClosedContractsFreelancer(mockRquestUser),
      ).toEqual(contractsClosedRes);
    });
  });
});
