import { Test, TestingModule } from '@nestjs/testing';
import { RequstController } from './requst.controller';
import { RequsetService } from './requset.service';
import { PostRequestMock, SendOfferMock } from './mockData/mockUserData';
import { freelancerId, jobIdMock } from './constants/mock-test-const';
import { mockJobOwner1 } from '@/common/mocks/users';
import { User } from '@/common/entities/User.entity';

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
            user: mockJobOwner1 as User,
          },
          freelancerId,
          jobIdMock,
          SendOfferMock,
        ),
      ).toEqual(
        mockRequestService.addOffer(
          mockJobOwner1 as User,
          jobIdMock,
          freelancerId,
          SendOfferMock,
        ),
      );

      expect(mockRequestService.addOffer).toHaveBeenCalledWith(
        mockJobOwner1 as User,
        jobIdMock,
        freelancerId,
        SendOfferMock,
      );
    });

    it('should post request, be called one time and return payload after this operation', async (): Promise<void> => {
      expect(
        await requestController.createRequest(
          {
            user: mockJobOwner1 as User,
          },
          freelancerId,
          jobIdMock,
          PostRequestMock,
        ),
      ).toEqual(
        mockRequestService.addRequest(
          mockJobOwner1 as User,
          PostRequestMock,
          freelancerId,
          jobIdMock,
        ),
      );

      expect(mockRequestService.addRequest).toHaveBeenCalledWith(
        mockJobOwner1 as User,
        PostRequestMock,
        freelancerId,
        jobIdMock,
      );
    });
  });
});
