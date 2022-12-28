import { Test, TestingModule } from '@nestjs/testing';
import {
  ExecutionContext,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import * as request from 'supertest';
import { HttpStatus } from '@nestjs/common/enums';
import { UserService } from '@/modules/user/user.service';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { UserController } from '@/modules/user/user.controller';
import {
  educationPayload,
  workhistoryPayload,
} from '@/common/constants/mockdata';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  const userService = {
    getWorkInfo: () => [],
    getEducationInfo: () => [],
    addWorkhistoryInfo: () => {},
    addEducationInfo: () => {},
    addUserInfo: () => {},
    sendPasswordResetMail: () => {},
    resetPassword: () => {},
  };

  const mockUser = {
    id: 1,
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: userService,
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

  it('/user (GET) current user infomation', () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(HttpStatus.OK)
      .expect(mockUser);
  });

  it('/user/workhistory-info (GET) work history', () => {
    return request(app.getHttpServer())
      .get('/user/workhistory-info')
      .expect(HttpStatus.OK)
      .expect(userService.getWorkInfo());
  });
  describe('/user/education-info (GET) education', () => {
    it('should return status code 200', () => {
      return request(app.getHttpServer())
        .get('/user/education-info')
        .expect(HttpStatus.OK)
        .expect(userService.getEducationInfo());
    });
    it('should return status code 404', () => {
      return request(app.getHttpServer())
        .get('/user/education-infoo')
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('/user/education-info (POST) update/set education', () => {
    it('should return status code 200', () => {
      return request(app.getHttpServer())
        .post('/user/education-info')
        .send(educationPayload)
        .expect(HttpStatus.OK);
    });

    it('wrong type/expects more(less) fields: should return status code 400', () => {
      return request(app.getHttpServer())
        .post('/user/education-info')
        .send([{ education_from: 2010 }])
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('/user/workhistory-info (POST) update/set workhistory', () => {
    it('should return status code 200', () => {
      return request(app.getHttpServer())
        .post('/user/workhistory-info')
        .send(workhistoryPayload)
        .expect(HttpStatus.OK);
    });

    it('wrong type/expects more(less) fields: should return status code 400', () => {
      return request(app.getHttpServer())
        .post('/user/workhistory-info')
        .send([
          {
            work_history_descr: 'Worked at Google, PERN stack',
            work_history_from: 2020,
            work_history_to: '2022',
          },
        ])
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('/user (PUT) update user', () => {
    it('should return status code 200', () => {
      return request(app.getHttpServer())
        .put('/user')
        .send({ first_name: 'John', english_level: 'Intermediate' })
        .expect(HttpStatus.OK);
    });

    it('wrong english level: should return status code 400', () => {
      return request(app.getHttpServer())
        .put('/user')
        .send({ english_level: 'Intermediate1' })
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('/passwordresetrequest (POST) send mail for password reset', () => {
    it('should return status code 200', () => {
      return request(app.getHttpServer())
        .post('/user/passwordresetrequest')
        .send({ email: 'test@test.com' })
        .expect(HttpStatus.OK);
    });

    it('wrong email: should return status code 400', () => {
      return request(app.getHttpServer())
        .post('/user/passwordresetrequest')
        .send({ email: 'test@test' })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('email does not exist: should return status code 400', () => {
      return request(app.getHttpServer())
        .post('/user/passwordresetrequest')
        .send({})
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('/passwordreset (POST) set new password', () => {
    it('should return status code 200', () => {
      return request(app.getHttpServer())
        .post('/user/passwordreset')
        .send({ key: 'test', password: 'Qwerty123' })
        .expect(HttpStatus.OK);
    });

    it('wrong password: should return status code 400', () => {
      return request(app.getHttpServer())
        .post('/user/passwordreset')
        .send({ key: 'test', password: 'qwerty123' })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('password does not exist: should return status code 400', () => {
      return request(app.getHttpServer())
        .post('/user/passwordreset')
        .send({ key: 'test' })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('key does not exist: should return status code 400', () => {
      return request(app.getHttpServer())
        .post('/user/passwordreset')
        .send({ password: 'Qwerty123' })
        .expect(HttpStatus.BAD_REQUEST);
    });
  });
});
