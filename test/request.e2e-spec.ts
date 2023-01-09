import { Test, TestingModule } from '@nestjs/testing';
import {
  ExecutionContext,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import * as request from 'supertest';
import { HttpStatus } from '@nestjs/common/enums';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import {
  educationPayload,
  workhistoryPayload,
} from '@/common/constants/mockdata';
import { RequstController } from '@/modules/requests/requst.controller';
import { RequsetService } from '@/modules/requests/requset.service';
import { SendOfferMock } from '@/modules/requests/mockData/mockUserData';

describe('RequestController (e2e)', () => {
  let app: INestApplication;

  const requestService = {
    addRequest: () => {},
    addOffer: () => {},
  };

  const mockUser = {
    id: 1,
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [RequstController],
      providers: [
        {
          provide: RequsetService,
          useValue: requestService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const req = context.switchToHttp().getRequest();
          req.user = mockUser;

          return true;
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  describe('/offer/:fr/:job (POST) add request', () => {
    it('should return status code 200', () => {
      return request(app.getHttpServer())
        .post('/user/education-info')
        .send(SendOfferMock)
        .expect(HttpStatus.OK);
    });

    // it('wrong type/expects more(less) fields: should return status code 400', () => {
    //   return request(app.getHttpServer())
    //     .post('/user/education-info')
    //     .send([{ education_from: 2010 }])
    //     .expect(HttpStatus.BAD_REQUEST);
    // });
  });

  //   describe('/user/workhistory-info (POST) update/set workhistory', () => {
  // it('should return status code 200', () => {
  //   return request(app.getHttpServer())
  //     .post('/user/workhistory-info')
  //     .send(workhistoryPayload)
  //     .expect(HttpStatus.OK);
  // });

  // it('wrong type/expects more(less) fields: should return status code 400', () => {
  //   return request(app.getHttpServer())
  //     .post('/user/workhistory-info')
  //     .send([
  //       {
  //         work_history_descr: 'Worked at Google, PERN stack',
  //         work_history_from: 2020,
  //         work_history_to: '2022',
  //       },
  //     ])
  //     .expect(HttpStatus.BAD_REQUEST);
  // });
  //   });
});
