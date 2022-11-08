import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from '@/modules/user/user.service';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  getUserInformation(@Request() req) {
    return req.user;
  }
}
