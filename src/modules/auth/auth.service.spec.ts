import { Test, TestingModule } from '@nestjs/testing';
import { Request } from '@entities/Request.entity';
import { Conversation } from '@entities/Conversation.entity';
import { getRepositoryProvider } from '@/common/utils/tests';
import { AuthService } from './auth.service';
import { User } from '@/common/entities/User.entity';
import { UserService } from '../user/user.service';

describe('JobsService', () => {
  let authService: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

  describe('', () => {
    it('should return job by id', async (): Promise<void> => {
      // jest.spyOn(userService, 'findByEmail').mockResolvedValue(job);
    });
  });
});
