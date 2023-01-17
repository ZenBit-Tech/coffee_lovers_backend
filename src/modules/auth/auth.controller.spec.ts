import { Test, TestingModule } from '@nestjs/testing';
import CreateUserDto from '@/modules/user/dto/create-user.dto';
import { createUserDto, signInDto } from '@/common/mocks/auth';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import SignInDto from './dto/signIn.dto';
import {
  CredentialDto,
  requestCredentialMock,
} from './googleauth/dto/credential';

describe('AuthController', () => {
  let authController: AuthController;

  const mockAuthService = {
    signUp: jest.fn().mockImplementation((dto: CreateUserDto) => ({
      access_token: 'tokentest',
    })),
    signIn: jest.fn().mockImplementation((dto: SignInDto) => ({
      access_token: 'tokentest',
    })),
    googleLogin: jest.fn().mockImplementation((dto: CredentialDto) => ({
      access_token: 'tokentest',
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    authController = module.get<AuthController>(AuthController);
  });

  describe('Sign up', () => {
    it('should call signUp method in authService with create user dto', async () => {
      await authController.signUp(createUserDto);

      expect(mockAuthService.signUp).toBeCalledWith(createUserDto);
    });

    it('should return token dto', async () => {
      const token = await authController.signUp(createUserDto);

      expect(token).not.toEqual({});
      expect(token).toHaveProperty('access_token');
    });

    it('access token should have correct type', async () => {
      expect(await authController.signUp(createUserDto)).not.toEqual({
        access_token: expect.any(Number),
      });
    });
  });

  describe('Sign in', () => {
    it('should call signIn method in authService with sign in dto', async () => {
      await authController.signIn(signInDto);

      expect(mockAuthService.signIn).toBeCalledWith(signInDto);
    });

    it('should return token dto', async () => {
      const token = await authController.signIn(signInDto);

      expect(token).not.toEqual({});
      expect(token).toHaveProperty('access_token');
    });

    it('access token should have correct type', async () => {
      expect(await authController.signIn(signInDto)).not.toEqual({
        access_token: expect.any(Number),
      });
    });
  });

  describe('Login with google', () => {
    it('should call method in authService with google login token', async () => {
      const oneTime = 1;
      await authController.googleAuth(requestCredentialMock);

      expect(mockAuthService.googleLogin).toBeCalledTimes(oneTime);
      expect(mockAuthService.googleLogin).toBeCalledWith(requestCredentialMock);
    });

    it('should return token dto', async () => {
      const token = await authController.googleAuth(requestCredentialMock);

      expect(token).not.toEqual({});
      expect(token).toHaveProperty('access_token');
    });

    it('access token should have correct type', async () => {
      expect(
        await authController.googleAuth(requestCredentialMock),
      ).not.toEqual({
        access_token: expect.any(Number),
      });
    });
  });
});
