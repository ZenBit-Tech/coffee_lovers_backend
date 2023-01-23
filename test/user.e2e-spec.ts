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
import { getFavoritesParams, mockResp } from '@/common/mocks/users';

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
    getFreelancerInfoById: (key: number) => {
      return mockResp.freelancerById;
    },
    setFavorite: () => {},
    getFavorites: () => ({}),
    setFreelancerRating: () => ({}),
    getFreelancerRating: (id: string) => [],
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

  describe('/user/freelancer/:key GET freelancer by id', () => {
    const params = { key: '2' };
    const wrongParam = { key: 'q' };

    it('should return status code 200', () => {
      return request(app.getHttpServer())
        .get(`/user/freelancer/${params.key}`)
        .expect(HttpStatus.OK)
        .expect(mockResp.freelancerById);
    });

    it('should return status code 400: wrong param', () => {
      return request(app.getHttpServer())
        .get(`/user/freelancer/${wrongParam.key}`)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return status code 404: wrong endpoint', () => {
      return request(app.getHttpServer())
        .get(`/user/freelancerr/${params.key}`)
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('/user/favorites (POST) add or delete new favorite', () => {
    it('should return status code 200', () => {
      return request(app.getHttpServer())
        .post('/user/favorites')
        .send({ id: 1, is_favorite: true })
        .expect(HttpStatus.OK);
    });

    it('wrong id type: should return status code 400', () => {
      return request(app.getHttpServer())
        .post('/user/favorites')
        .send({ id: '1' })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('wrong is_favorite type: should return status code 400', () => {
      return request(app.getHttpServer())
        .post('/user/favorites')
        .send({ is_favorite: 'true' })
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('/user/favorites (GET) all favorites', () => {
    it('should return status code 200', () => {
      return request(app.getHttpServer())
        .get('/user/favorites')
        .query(getFavoritesParams)
        .expect(HttpStatus.OK)
        .expect(userService.getFavorites());
    });
    it('should return status code 400: wrong page field type', () => {
      return request(app.getHttpServer())
        .get('/user/favorites')
        .query({ page: 'q' })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return status code 400: wrong take field type', () => {
      return request(app.getHttpServer())
        .get('/user/favorites')
        .query({ take: false })
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('/user/freelancerrating (POST) set freelancer rating', () => {
    it('should return status code 200', () => {
      return request(app.getHttpServer())
        .post('/user/freelancerrating')
        .send({
          freelancer_id: 1,
          freelancer_rating: 5,
          rating_comment: 'good',
          job_id: 1,
        })
        .expect(HttpStatus.OK)
        .expect(userService.setFreelancerRating());
    });

    it('wrong freelancer_id type: should return status code 400', () => {
      return request(app.getHttpServer())
        .post('/user/freelancerrating')
        .send({ freelancer_id: '1' })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('wrong freelancer_rating type: should return status code 400', () => {
      return request(app.getHttpServer())
        .post('/user/freelancerrating')
        .send({ freelancer_rating: 'hello' })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('wrong rating_comment type: should return status code 400', () => {
      return request(app.getHttpServer())
        .post('/user/freelancerrating')
        .send({ rating_comment: true })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('wrong job_id type: should return status code 400', () => {
      return request(app.getHttpServer())
        .post('/user/freelancerrating')
        .send({ job_id: '2' })
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('/user/freelancerrating/:id (GET) all freelancer ratings', () => {
    const params = { id: '2' };
    const wrongParam = { id: 'q' };

    it('should return status code 200 and array as response', async () => {
      const response = await request(app.getHttpServer())
        .get(`/user/freelancerrating/${params.id}`)
        .expect(HttpStatus.OK);

      expect(Array.isArray(response.body));
    });

    it('should return status code 400: wrong param', () => {
      return request(app.getHttpServer())
        .get(`/user/freelancer/${wrongParam.id}`)
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
