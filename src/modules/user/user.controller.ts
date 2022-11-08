import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from '@/modules/user/user.service';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // eslint-disable-next-line
  @UseGuards(JwtAuthGuard)
  @Get('')
  getUser(@Request() req) {
    return req.user;
  }
}
