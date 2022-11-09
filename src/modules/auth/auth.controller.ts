import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '@/modules/auth/auth.service';
import { RequestUser } from '@/modules/auth/googleauth/dto/requestUser.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: object) {
    return req;
  }

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: RequestUser) {
    return this.authService.googleLogin(req);
  }
}
