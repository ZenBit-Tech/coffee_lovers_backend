import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '@/modules/auth/auth.service';
import CreateUserDto from '@/modules/user/dto/create-user.dto';
import SignInDto from '@/modules/auth/dto/signIn.dto';
import AuthResponseDto from '@/modules/auth/dto/auth-response.dto';

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
}
