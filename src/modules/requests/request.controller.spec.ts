import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@entities/User.entity';
import { RequstController } from './requst.controller';
import { RequsetService } from './requset.service';
import ReqBody from './dto/request-body-dto';
import OfferBody from './dto/offer-body-dto copy';
import {
  PostRequestMock,
  SendOfferMock,
  UserMock,
} from './mockData/mockUserData';

describe('RequestController', () => {
  let requestController: RequstController;

  const mockRequestService = {
    addOffer: jest
      .fn()
      .mockImplementation(
        (user: User, jobId: number, fr: number, body: OfferBody) => null,
      ),
    addRequest: jest
      .fn()
      .mockImplementation(
        (user: User, body: ReqBody, fr: number, job_id: number) => null,
      ),
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
          5,
          35,
          SendOfferMock,
        ),
      ).toEqual(mockRequestService.addOffer(UserMock, 5, 35, SendOfferMock));

      expect(mockRequestService.addOffer).toHaveBeenCalledWith(
        UserMock,
        5,
        35,
        SendOfferMock,
      );
    });

    it('should post request, be called one time and return payload after this operation', async (): Promise<void> => {
      expect(
        await requestController.createRequest(
          {
            user: UserMock,
          },
          5,
          35,
          PostRequestMock,
        ),
      ).toEqual(
        mockRequestService.addRequest(UserMock, 5, 35, PostRequestMock),
      );

      expect(mockRequestService.addRequest).toHaveBeenCalledWith(
        UserMock,
        5,
        35,
        PostRequestMock,
      );
    });
  });
});
