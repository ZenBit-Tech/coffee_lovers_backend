import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import {
  PostRequestMock,
  SendOfferMock,
} from '@/modules/requests/mockData/mockUserData';
import { hRate, hRateErr } from '@/modules/requests/constants/mock-test-const';
import ReqBody from './request-body-dto';
import OfferBody from './offer-body-dto copy';

describe('PostRequestParams', () => {
  it('should be validated successfully', async (): Promise<void> => {
    const dto = PostRequestMock;
    const errors = await validate(plainToClass(ReqBody, dto));
    expect(errors.length).toBe(0);
  });

  it('payload has no properties, should be an error', async (): Promise<void> => {
    const dto = {};
    const errors = await validate(plainToClass(ReqBody, dto));
    expect(errors.length).not.toBe(0);
  });

  it('wrong request property type, should be an error', async (): Promise<void> => {
    const dto = { ...PostRequestMock, cover_letter: hRate };
    const errors = await validate(plainToClass(ReqBody, dto));
    expect(errors.length).not.toBe(0);
  });
});

describe('PostOfferParams', () => {
  it('should be validated successfully', async (): Promise<void> => {
    const dto = SendOfferMock;
    const errors = await validate(plainToClass(OfferBody, dto));
    expect(errors.length).toBe(0);
  });

  it('payload has no properties, should be an error', async (): Promise<void> => {
    const dto = {};
    const errors = await validate(plainToClass(OfferBody, dto));
    expect(errors.length).not.toBe(0);
  });

  it('wrong type for hourly rate, should be an error', async (): Promise<void> => {
    const dto = { ...SendOfferMock, hourly_rate: hRateErr };
    const errors = await validate(plainToClass(OfferBody, dto));
    expect(errors.length).not.toBe(0);
  });
});
