import {
  Controller,
  Get,
  Post,
  Request,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '@/modules/user/user.service';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import UserDto from './dto/user.dto';
import PasswordResetDto from './dto/password-reset.dto';
import PasswordResetRequestDto from './dto/password-reset-request.dto';

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

  @ApiOperation({ summary: 'send mail for password reset' })
  @Post('passwordresetrequest')
  passwordResetRequest(@Body() dto: PasswordResetRequestDto) {
    return this.userService.sendPasswordResetMail(dto);
  }

  @Post('passwordreset')
  passwordReset(@Body() dto: PasswordResetDto) {
    return this.userService.resetPassword(dto);
  }
}
