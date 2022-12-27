import { Request } from '@entities/Request.entity';
import { ForbiddenException } from '@nestjs/common';
import UserDto from '@/modules/user/dto/user.dto';

export const isRequestForFreelancer = (
  freelancer: UserDto,
  request: Request,
): void => {
  if (!(request && request.freelancer.id === freelancer.id)) {
    throw new ForbiddenException();
  }
};
