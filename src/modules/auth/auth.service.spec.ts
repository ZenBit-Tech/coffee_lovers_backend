import { Test, TestingModule } from '@nestjs/testing';
import { Request } from '@entities/Request.entity';
import { Conversation } from '@entities/Conversation.entity';
import * as f from 'google-auth-library';
import { getRepositoryProvider } from '@/common/utils/tests';
import { AuthService } from './auth.service';
import { User } from '@/common/entities/User.entity';
import { UserService } from '@/modules/user/user.service';
import { UserModule } from '../user/user.module';

// jest.mock('google-auth-library', () => {
//   const googleApisMock = {
//     OAuth2Client: jest.fn().mockImplementation(() => {
//       return {
//         getTokenInfo: jest.fn().mockResolvedValue({
//           email: 'testEmail',
//         }),
//       };
//     }),
//   };

//   return googleApisMock;
// });

jest.spyOn(new f.OAuth2Client(), 'getTokenInfo').mockResolvedValue({
  email: 'testEmail',
  aud: '',
  scopes: [],
  expiry_date: 123445,
});

describe('JobsService', () => {
  let authService: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
      providers: [
        AuthService,
        getRepositoryProvider(User),
        getRepositoryProvider(Request),
        getRepositoryProvider(Conversation),
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  describe('login with google', () => {
    it('should return job by id', async (): Promise<void> => {
      const response = { role: true, access_token: '' };
      const request = { access_token: '' };

      jest.spyOn(userService, 'findByEmail').mockResolvedValue(undefined);
      jest.spyOn(authService, 'googleLogin').mockResolvedValue(response);
      jest.spyOn(authService, 'signUp').mockResolvedValue(response);
      jest.spyOn(userService, 'setIfGoogle').mockResolvedValue();
      jest.spyOn(authService, 'signIn').mockResolvedValue(response);

      expect(await authService.googleLogin(request)).toBe(response);
    });
  });
});
