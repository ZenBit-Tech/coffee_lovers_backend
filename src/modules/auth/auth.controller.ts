import { Controller, Post, Get } from '@nestjs/common';
import { AuthService } from '@/modules/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
}
