import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { User } from '@entities/User.entity';
import { Education } from '@entities/Education.entity';
import { WorkHistory } from '@entities/WorkHistory.entity';
import { Request } from '@entities/Request.entity';
import { Category } from '@entities/Category.entity';
import { getRepositoryProvider } from '@utils/tests';
import { MailService } from '@/modules/mail/mail.service';
import { FileService } from '@/modules/file/file.service';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;

  const mockUserRepository = {};
  const mockCategoryRepository = {};
  const mockEducationRepository = {};
  const mockWorkHistoryRepository = {};
  const mockRequestRepository = {};

  const mockConfigService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        ConfigService,
        MailService,
        FileService,
        getRepositoryProvider(User, mockUserRepository),
        getRepositoryProvider(Category, mockCategoryRepository),
        getRepositoryProvider(Education, mockEducationRepository),
        getRepositoryProvider(WorkHistory, mockWorkHistoryRepository),
        getRepositoryProvider(Request, mockRequestRepository),
      ],
    })
      .overrideProvider(ConfigService)
      .useValue(mockConfigService)
      .overrideProvider(MailService)
      .useValue(mockConfigService)
      .overrideProvider(FileService)
      .useValue(mockConfigService)
      .compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });
});
