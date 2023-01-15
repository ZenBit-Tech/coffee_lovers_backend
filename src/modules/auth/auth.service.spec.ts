import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '@/modules/user/user.service';
import CreateUserDto from '@/modules/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import SignInDto from './dto/signIn.dto';
import TokenDto from './dto/token.dto';

describe('AuthService', () => {
  let authService: AuthService;

  const mockUserService = {
    findByEmail: (email: string) => ({ email }),
    create: (dto: CreateUserDto) => dto,
  };
  const mockJwtService = {
    sign: (payload: TokenDto) => payload.email,
  };
  const mockConfigService = {
    get: () => '',
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
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  describe('Sign up', () => {
    it('should return access token', async () => {
      jest.spyOn(mockUserService, 'findByEmail').mockReturnValue(null);

      expect(await authService.signUp(createUserDto)).toStrictEqual({
        access_token: createUserDto.email,
      });
    });

    it('if user exists should throw bad request exception', async () => {
      await expect(authService.signUp(createUserDto)).rejects.toEqual(
        new BadRequestException('User is already exist'),
      );
    });
  });

  describe('Sign in', () => {
    it('should return access token', async () => {
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      expect(await authService.signIn(signInDto)).toStrictEqual({
        access_token: createUserDto.email,
      });
    });

    it('if email wrong should throw bad request exception', async () => {
      jest.spyOn(mockUserService, 'findByEmail').mockReturnValue(null);

      await expect(authService.signIn(signInDto)).rejects.toEqual(
        new BadRequestException('invalid email'),
      );
    });

    it('if password wrong should throw bad request exception', async () => {
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      await expect(authService.signIn(signInDto)).rejects.toEqual(
        new BadRequestException('invalid password'),
      );
    });
  });
});
