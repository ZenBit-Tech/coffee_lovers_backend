import {
  Controller,
  Get,
  Post,
  Request,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '@/modules/user/user.service';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import UserDto from './dto/user.dto';
import PasswordResetDto from './dto/password-reset.dto';
import PasswordResetRequestDto from './dto/password-reset-request.dto';
import ProfileQuestionsDto from './dto/profile-questions.dto';

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
  getUserInformation(@Request() req): UserDto {
    return req.user;
  }

  @ApiOperation({ summary: 'send mail for password reset' })
  @Post('passwordresetrequest')
  @HttpCode(HttpStatus.OK)
  passwordResetRequest(@Body() dto: PasswordResetRequestDto): Promise<void> {
    return this.userService.sendPasswordResetMail(dto);
  }

  @ApiOperation({ summary: "reset user's password" })
  @Post('passwordreset')
  @HttpCode(HttpStatus.OK)
  passwordReset(@Body() dto: PasswordResetDto): Promise<void> {
    return this.userService.resetPassword(dto);
  }

  @ApiOperation({ summary: 'sent information about user' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @UseGuards(JwtAuthGuard)
  @Post('profile-questions-1')
  @HttpCode(HttpStatus.OK)
  ProfileQuestions(@Body() payload: ProfileQuestionsDto): Promise<string> {
    return this.userService.createUserProfile(payload);
  }
}
