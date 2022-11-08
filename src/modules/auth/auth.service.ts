import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import SignInDto from '@/modules/auth/dto/signIn.dto';
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

  async signUp(dto: SignInDto): Promise<any> {
    try {
      const user = await this.userService.findByEmail(dto.email);
    } catch (error) {
      throw new HttpException('', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
