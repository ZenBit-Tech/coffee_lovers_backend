import { Injectable, Req } from '@nestjs/common';
import { RequestUser } from '@/modules/auth/googleauth/dto/requestUser.dto';

@Injectable()
export class AuthService {
  googleLogin(@Req() req: RequestUser) {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
