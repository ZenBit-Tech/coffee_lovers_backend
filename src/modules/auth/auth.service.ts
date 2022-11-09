import { Injectable, Req } from '@nestjs/common';
import { RequestUserDto } from '@/modules/auth/googleauth/dto/requestUser.dto';

@Injectable()
export class AuthService {
  googleLogin(@Req() req: RequestUserDto) {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
