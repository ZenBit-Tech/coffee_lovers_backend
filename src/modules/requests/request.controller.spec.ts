import { Test, TestingModule } from '@nestjs/testing';
import { RequstController } from './requst.controller';
import { RequsetService } from './requset.service';
import {
  PostRequestMock,
  SendOfferMock,
  UserMock,
} from './mockData/mockUserData';
import { freelancerId, jobIdMock } from './constants/mock-test-const';

describe('RequestController', () => {
  let requestController: RequstController;

  const mockRequestService = {
    addOffer: jest.fn().mockImplementation(() => null),
    addRequest: jest.fn().mockImplementation(() => null),
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
            user: UserMock,
          },
          freelancerId,
          jobIdMock,
          SendOfferMock,
        ),
      ).toEqual(
        mockRequestService.addOffer(
          UserMock,
          jobIdMock,
          freelancerId,
          SendOfferMock,
        ),
      );

      expect(mockRequestService.addOffer).toHaveBeenCalledWith(
        UserMock,
        jobIdMock,
        freelancerId,
        SendOfferMock,
      );
    });

    it('should post request, be called one time and return payload after this operation', async (): Promise<void> => {
      expect(
        await requestController.createRequest(
          {
            user: UserMock,
          },
          freelancerId,
          jobIdMock,
          PostRequestMock,
        ),
      ).toEqual(
        mockRequestService.addRequest(
          UserMock,
          PostRequestMock,
          freelancerId,
          jobIdMock,
        ),
      );

      expect(mockRequestService.addRequest).toHaveBeenCalledWith(
        UserMock,
        PostRequestMock,
        freelancerId,
        jobIdMock,
      );
    });
  });
});
