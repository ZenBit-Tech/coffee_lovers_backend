import { Test, TestingModule } from '@nestjs/testing';
import { mockCredential } from '@/common/mocks/users';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CredentialDto } from './googleauth/dto/credential';

describe('AuthController', () => {
  let authController: AuthController;

  const mockAuthService = {
    googleLogin: jest
      .fn()
      .mockImplementation((body: CredentialDto) => mockCredential),
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

  describe('googleAuth', () => {
    it('should return access_token', async (): Promise<void> => {
      const payload = { access_token: 'Some credential' };
      expect(await authController.googleAuth(payload)).toEqual(
        mockAuthService.googleLogin(payload),
      );
      expect(await authController.googleAuth(payload)).toEqual(mockCredential);
      expect(mockAuthService.googleLogin).toHaveBeenCalledWith(payload);
    });
  });
});
