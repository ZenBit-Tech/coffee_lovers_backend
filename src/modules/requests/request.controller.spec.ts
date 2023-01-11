import { Test, TestingModule } from '@nestjs/testing';
import { mockJobOwner1, mockJobOwnerOfTypeUser } from '@/common/mocks/users';
import { User } from '@/common/entities/User.entity';
import { RequstController } from './requst.controller';
import { RequsetService } from './requset.service';
import { PostRequestMock, SendOfferMock } from './mockData/mockUserData';
import { freelancerId, jobIdMock } from './constants/mock-test-const';

describe('RequestController', () => {
  let requestController: RequstController;

  const mockRequestService = {
    addOffer: jest.fn().mockImplementation(() => {}),
    addRequest: jest.fn().mockImplementation(() => {}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequstController],
      providers: [RequsetService],
    })
      .overrideProvider(RequsetService)
      .useValue(mockRequestService)
      .compile();

    requestController = module.get<RequstController>(RequstController);
  });

  describe('post request', () => {
    it('should post offer, be called one time and return payload after this operation', async (): Promise<void> => {
      expect(
        await requestController.createOffer(
          {
            user: mockJobOwnerOfTypeUser,
          },
          freelancerId,
          jobIdMock,
          SendOfferMock,
        ),
      ).toEqual(
        mockRequestService.addOffer(
          mockJobOwnerOfTypeUser,
          jobIdMock,
          freelancerId,
          SendOfferMock,
        ),
      );

      expect(mockRequestService.addOffer).toHaveBeenCalledWith(
        mockJobOwnerOfTypeUser,
        jobIdMock,
        freelancerId,
        SendOfferMock,
      );
    });

    it('should post request, be called one time and return payload after this operation', async (): Promise<void> => {
      expect(
        await requestController.createRequest(
          {
            user: mockJobOwnerOfTypeUser,
          },
          freelancerId,
          jobIdMock,
          PostRequestMock,
        ),
      ).toEqual(
        mockRequestService.addRequest(
          mockJobOwnerOfTypeUser,
          PostRequestMock,
          freelancerId,
          jobIdMock,
        ),
      );

      expect(mockRequestService.addRequest).toHaveBeenCalledWith(
        mockJobOwnerOfTypeUser,
        PostRequestMock,
        freelancerId,
        jobIdMock,
      );
    });
  });
});
