import { Test, TestingModule } from '@nestjs/testing';
import { ReqUser } from '@/modules/user/dto/get-user-dto.dto';
import { InviteController } from './conversations.controller';
import { InviteService } from './conversations.service';

describe('JobsController', () => {
  let inviteController: InviteController;

  const mockInviteService = {
    checkChatAvailability: jest
      .fn()
      .mockImplementation((req: ReqUser, fr: number) => [
        {
          freelancer: { id: fr },
          data: [],
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
    it('should return freelancer and array of conversations', async (): Promise<void> => {
      const freelancerId = 1 as number;
      const request = { user: { id: '4' } };
      expect(
        await inviteController.checkChatOpened(request, freelancerId),
      ).toEqual(mockInviteService.checkChatAvailability(request, freelancerId));

      expect(mockInviteService.checkChatAvailability).toHaveBeenCalledWith(
        request,
        freelancerId,
      );
    });
  });
});
