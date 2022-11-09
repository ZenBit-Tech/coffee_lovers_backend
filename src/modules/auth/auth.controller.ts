import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '@/modules/auth/auth.service';
import CreateUserDto from '@/modules/user/dto/create-user.dto';
import SignInDto from '@/modules/auth/dto/signIn.dto';
import AuthResponseDto from '@/modules/auth/dto/auth-response.dto';
import { RequestUserDto } from '@/modules/auth/googleauth/dto/requestUser.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Creating new user' })
  @ApiResponse({ type: AuthResponseDto })
  @Post('/signup')
  signUp(@Body() dto: CreateUserDto) {
    return this.authService.signUp(dto);
  }

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ type: AuthResponseDto })
  @Post('/signin')
  signIn(@Body() dto: SignInDto) {
    return this.authService.signIn(dto);
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: object) {
    return req;
  }

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: RequestUserDto) {
    return this.authService.googleLogin(req);
  }
}
