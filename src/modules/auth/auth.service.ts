import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import AuthDto from '@/modules/auth/dto/auth.dto';
import { UserModule } from '@/modules/user/user.module';
import { UserService } from '@/modules/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserModule)
    private userService: UserService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async signUp(dto: AuthDto): Promise<any> {
    try {
      const user = await this.userService.findByEmail(dto.email);
    } catch (error) {
      throw new HttpException('', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
