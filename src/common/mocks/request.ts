import ReqBody from '@/modules/requests/dto/request-body-dto';
import { ReqUser } from '@/modules/user/dto/get-user-dto.dto';
import { RequestType } from '@/common/constants/entities';
import { mockJobOwnerOfTypeUser } from './users';

export const mockRquestBody: ReqBody = {
  type: RequestType.PROPOSAL,
  hourly_rate: 0,
  reject: false,
  cover_letter: 'Cover letter',
};

export const mockRquestUser: ReqUser = {
  user: mockJobOwnerOfTypeUser,
};
