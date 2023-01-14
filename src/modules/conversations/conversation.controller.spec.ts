import { Test, TestingModule } from '@nestjs/testing';
import { ReqUser } from '@/modules/user/dto/get-user-dto.dto';
import { mockRquestUser } from '@/common/mocks/request';
import { InviteController } from './conversations.controller';
import { InviteService } from './conversations.service';

describe('InviteController', () => {
  let inviteController: InviteController;

  const mockInviteService = {
    checkChatAvailability: jest
      .fn()
      .mockImplementation((req: ReqUser, fr: number) => [
        {
          freelancer: fr,
        },
      ]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InviteController],
      providers: [InviteService],
    })
      .overrideProvider(InviteService)
      .useValue(mockInviteService)
      .compile();

    inviteController = module.get<InviteController>(InviteController);
  });

  describe('checkChatOpened', () => {
    it('should be called with jobowner request and freelancer id', async (): Promise<void> => {
      const freelancerId = 1;
      expect(
        await inviteController.checkChatOpened(mockRquestUser, freelancerId),
      ).toEqual(
        mockInviteService.checkChatAvailability(mockRquestUser, freelancerId),
      );

      expect(mockInviteService.checkChatAvailability).toHaveBeenCalledWith(
        mockRquestUser,
        freelancerId,
      );
    });
  });
});
