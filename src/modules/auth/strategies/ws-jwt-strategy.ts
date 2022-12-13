import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { ConfigService } from '@nestjs/config';
import { UserService } from '@/modules/user/user.service';
import TokenDto from '@/modules/auth/dto/token.dto';
import UserDto from '@/modules/user/dto/user.dto';

@Injectable()
export class WsJwtStrategy extends PassportStrategy(Strategy, 'wsjwt') {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: TokenDto): Promise<UserDto> {
    try {
      const user = await this.userService.findByEmail(payload.email);
      if (!user) {
        throw new WsException('Unauthorized');
      }

      return { ...user };
    } catch (error) {
      if (error instanceof WsException) {
        throw error;
      }
      throw new WsException('Internal error');
    }
  }
}
