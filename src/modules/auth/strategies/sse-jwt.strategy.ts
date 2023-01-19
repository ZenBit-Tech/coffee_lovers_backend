import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  HttpException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sseQueryParam } from '@constants/auth-guards';
import { UserService } from '@/modules/user/user.service';
import TokenDto from '@/modules/auth/dto/token.dto';
import UserDto from '@/modules/user/dto/user.dto';

@Injectable()
export class SseJwtStrategy extends PassportStrategy(Strategy, 'ssejwt') {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter(sseQueryParam),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: TokenDto): Promise<UserDto> {
    try {
      const user = await this.userService.findByEmail(payload.email);
      if (!user) {
        throw new UnauthorizedException();
      }

      return { ...user };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}
