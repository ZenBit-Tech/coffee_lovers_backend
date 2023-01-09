import { OfferStatus, RequestType } from '@/common/constants/entities';

export const SendOfferMock = {
  hourly_rate: 20,
  status: OfferStatus.ACCEPTED,
};

export const PostRequestMock = {
  type: RequestType.PROPOSAL,
  hourly_rate: 15,
  reject: false,
  cover_letter: 'Your cover letter with skills description',
};
