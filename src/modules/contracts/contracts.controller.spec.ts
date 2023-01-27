import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@entities/User.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ReqUser } from '@/modules/user/dto/get-user-dto.dto';
import { ContractsController } from './contracts.controller';
import { ContractsService } from './contracts.service';
import TokenDto from '@/modules/auth/dto/token.dto';

describe('JobsController', () => {
  let contractsController: ContractsController;
  let reqUser: ReqUser;

  const mockContractsService = {
    getActiveContracts: jest.fn().mockImplementation((user: User) => ({
      id: 5,
    })),
    getClosedContracts: jest.fn().mockImplementation((user: User) => ({
      id: 4,
    })),
  };

  const mockJwtService = {
    sign: (payload: TokenDto) => payload.email,
  };
  const mockConfigService = {
    get: () => '',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContractsController],
      providers: [
        ContractsService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    })
      .overrideProvider(ContractsController)
      .useValue(mockContractsService)
      .compile();

    contractsController = module.get<ContractsController>(ContractsController);

    reqUser = {
      user: {
        id: 1,
      } as User,
    };
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  describe('getJobById', () => {
    it('should return job by id', async (): Promise<void> => {
      const req = { user: reqUser };
      expect(
        await contractsController.getActiveContractsFreelancer(req),
      ).toEqual(mockContractsService.getActiveContracts(reqUser));

      expect(mockContractsService.getActiveContracts).toHaveBeenCalledWith(
        reqUser,
      );
    });
  });
});
