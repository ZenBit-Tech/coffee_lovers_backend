import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ValidationPipe } from '@nestjs/common/pipes';
import * as request from 'supertest';
import { HttpStatus } from '@nestjs/common/enums';
import { AuthController } from '@/modules/auth/auth.controller';
import { AuthService } from '@/modules/auth/auth.service';
import CreateUserDto from '@/modules/user/dto/create-user.dto';
import SignInDto from '@/modules/auth/dto/signIn.dto';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  const authService = {
    signUp: (dto: CreateUserDto) => ({ access_token: dto.email }),
    signIn: (dto: SignInDto) => ({ access_token: dto.email }),
  };

  const createUserDto: CreateUserDto = {
    email: 'test@test.com',
    password: 'Qwerty123',
    first_name: 'John',
    last_name: 'Doe',
  };

  const signInDto: SignInDto = {
    email: 'test@test.com',
    password: 'Qwerty123',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  describe('/signup (POST) create new user', () => {
    it('should create new user', async () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send(createUserDto)
        .expect(HttpStatus.CREATED)
        .expect(authService.signUp(createUserDto));
    });

    it('wrong email type: should return status code 400', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({ ...createUserDto, email: 'test@test' })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('wrong password type: should return status code 400', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({ ...createUserDto, password: 'qwerty123' })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('empty first_name: should return status code 400', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({ ...createUserDto, first_name: '' })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('empty last_name: should return status code 400', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({ ...createUserDto, last_name: '' })
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('/signin (POST) login', () => {
    it('should create new user', async () => {
      return request(app.getHttpServer())
        .post('/auth/signin')
        .send(signInDto)
        .expect(HttpStatus.CREATED)
        .expect(authService.signIn(signInDto));
    });

    it('wrong email type: should return status code 400', () => {
      return request(app.getHttpServer())
        .post('/auth/signin')
        .send({ ...signInDto, email: 'test@test' })
        .expect(HttpStatus.BAD_REQUEST);
    });
  });
});
