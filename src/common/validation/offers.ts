import { ForbiddenException } from '@nestjs/common';
import { Offer } from '@entities/Offer.entity';
import { OfferStatus } from '@constants/entities';
import UserDto from '@/modules/user/dto/user.dto';

export const isOfferPendingForUser = (user: UserDto, offer: Offer): void => {
  if (
    !(
      offer &&
      offer.status === OfferStatus.PENDING &&
      offer.freelancer.id === user.id
    )
  ) {
    throw new ForbiddenException();
  }
};
