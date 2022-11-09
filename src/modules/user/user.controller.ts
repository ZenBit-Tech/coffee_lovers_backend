import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '@/modules/user/user.service';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import UserDto from '@/modules/user/dto/user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'get information about current user' })
  @ApiResponse({ type: UserDto })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @UseGuards(JwtAuthGuard)
  @Get('')
  getUserInformation(@Request() req) {
    return req.user;
  }
}
