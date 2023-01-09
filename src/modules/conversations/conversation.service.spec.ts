import { Test, TestingModule } from '@nestjs/testing';
import { Job } from '@entities/Job.entity';
import { Request } from '@entities/Request.entity';
import { Conversation } from '@entities/Conversation.entity';
import { ConfigService } from '@nestjs/config';
import { getRepositoryProvider } from '@/common/utils/tests';
import { User } from '@/common/entities/User.entity';
import { FileService } from '@/modules/file/file.service';
import { UserService } from '@/modules/user/user.service';
import { InviteService } from './conversations.service';

describe('JobsService', () => {
  let inviteService: InviteService;
  let userService: UserService;

  const mockConfigService = {
    get: () => '',
  };

  const mockUserService = {
    getUserById: (id: number) => ({
      id,
    }),
  };
  const mockFileService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InviteService,
        UserService,
        getRepositoryProvider(Job),
        getRepositoryProvider(Request),
        getRepositoryProvider(Conversation),
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: FileService,
          useValue: mockFileService,
        },
      ],
    }).compile();

    inviteService = module.get<InviteService>(InviteService);
    userService = module.get<UserService>(UserService);
  });

  describe('checkChatAvailability', () => {
    it('conversations found: should call checkChatAvailability , should get response object with freelancer and array of Conversations', async (): Promise<void> => {
      const freelancerId = 3 as number;
      const user = { id: 1 } as User;
      const freelancer = { id: freelancerId } as User;
      const response = {
        freelancer: { id: freelancerId } as User,
        data: [{ id: 35 } as Conversation],
      };

      jest.spyOn(userService, 'getUserById').mockResolvedValue(freelancer);
      jest
        .spyOn(inviteService, 'checkChatAvailability')
        .mockResolvedValue(response);

      expect(
        await inviteService.checkChatAvailability(user, freelancerId),
      ).toBe(response);
    });
  });
  it('conversations not found: should call checkChatAvailability , should get response object with freelancer and empty array', async (): Promise<void> => {
    const freelancerId = 3 as number;
    const user = { id: 1 } as User;
    const freelancer = { id: freelancerId } as User;
    const response = { freelancer: { id: freelancerId } as User, data: [] };

    jest.spyOn(userService, 'getUserById').mockResolvedValue(freelancer);
    jest
      .spyOn(inviteService, 'checkChatAvailability')
      .mockResolvedValue(response);

    expect(await inviteService.checkChatAvailability(user, freelancerId)).toBe(
      response,
    );
  });
});
