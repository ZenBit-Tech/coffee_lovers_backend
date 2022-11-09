import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { Prof } from '@/modules/auth/googleauth/dto/profile.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
      callbackURL: `http://${process.env.HOST}:${process.env.PORT}/auth/google/redirect`,
      scope: ['email', 'profile'],
    });
    this.validate = this.validate.bind(this);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Prof,
    done: VerifyCallback,
  ): Promise<void> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}
