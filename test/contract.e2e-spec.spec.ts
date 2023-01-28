import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { HttpStatus } from '@nestjs/common/enums';
import { ExecutionContext } from '@nestjs/common/interfaces';
import { ValidationPipe } from '@nestjs/common/pipes';
import { User } from '@entities/User.entity';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { ContractsService } from '@/modules/contracts/contracts.service';
import { ContractStatus } from '@/common/constants/entities';
import { ContractsController } from '@/modules/contracts/contracts.controller';
import { mockFreelancerOfTypeUser } from '@/common/mocks/users';

describe('ContractsController (e2e)', () => {
  let app: INestApplication;

  const contractsService = {
    setContractStatus: (contractId: number, status: ContractStatus) => null,
    getActiveContracts: (user: User) => [{ id: 5 }],
    getClosedContracts: (user: User) => [{ id: 10 }],
    closeContract: (user: User, contractId: number) => null,
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [ContractsController],
      providers: [
        {
          provide: ContractsService,
          useValue: contractsService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const req = context.switchToHttp().getRequest();
          req.user = { id: 1 };

          return true;
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  describe('/contracts/active (GET) active contracts', () => {
    it('should return active contracts of specified user', () => {
      return request(app.getHttpServer())
        .get('/contracts/active')
        .expect(HttpStatus.OK)
        .expect(contractsService.getActiveContracts(mockFreelancerOfTypeUser));
    });

    it('should return status 404', () => {
      return request(app.getHttpServer())
        .get('/contract/active')
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('/contracts/closed (GET) closed contracts', () => {
    it('should return closed contracts of specified user', () => {
      return request(app.getHttpServer())
        .get('/contracts/closed')
        .expect(HttpStatus.OK)
        .expect(contractsService.getClosedContracts(mockFreelancerOfTypeUser));
    });

    it('should return status 404', () => {
      return request(app.getHttpServer())
        .get('/contract/closed')
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('/contracts/close/:contractId (POST) close contract by id', () => {
    it('should set status to closed', () => {
      return request(app.getHttpServer())
        .post('/contracts/close/7')
        .expect(HttpStatus.CREATED);
    });

    it(' missing contracttId param: should return status code 404 ', () => {
      return request(app.getHttpServer())
        .post('/contracts/close/')
        .expect(HttpStatus.NOT_FOUND);
    });
    it('should return status code 404 ', () => {
      return request(app.getHttpServer())
        .post('/contract/close/7')
        .expect(HttpStatus.NOT_FOUND);
    });
  });
});
