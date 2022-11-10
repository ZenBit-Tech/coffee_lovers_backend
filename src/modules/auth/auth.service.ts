import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  BadRequestException,
  Body,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { UserService } from '@/modules/user/user.service';
import CreateUserDto from '@/modules/user/dto/create-user.dto';
import SignInDto from '@/modules/auth/dto/signIn.dto';
import TokenDto from '@/modules/auth/dto/token.dto';
import AuthResponseDto from '@/modules/auth/dto/auth-response.dto';
import { CredentialDto } from '@/modules/auth/googleauth/dto/credential';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService)
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async googleLogin(@Body() body: CredentialDto) {
    const ticket = await client.verifyIdToken({
      idToken: body.credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const userData = ticket.getPayload();
    if (!userData.email) {
      throw new HttpException('Please check user data', HttpStatus.BAD_REQUEST);
    }
    const dataLogin = {
      email: userData.email,
      first_name: userData.given_name,
      second_name: userData.family_name,
      is_google: true,
    };

    const user = await this.userService.findByEmail(dataLogin.email);
    if (!user) {
      const signupResponse = await this.signUp(dataLogin);

      return signupResponse;
    }
    const loginResponse = await this.signIn(dataLogin);

    return loginResponse;
  }

  async signUp(dto: CreateUserDto): Promise<AuthResponseDto> {
    try {
      const user = await this.userService.findByEmail(dto.email);
      if (user) {
        throw new BadRequestException('User is already exist');
      }
      await this.userService.create(dto);

      return this.createTokens(dto.email);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async signIn(dto: SignInDto): Promise<AuthResponseDto> {
    try {
      const user = await this.userService.findByEmail(dto.email);
      if (!user) {
        throw new BadRequestException('invalid email');
      }
      if (!user.is_google) {
        const isPassEquals = await bcrypt.compare(dto.password, user.password);

        if (!isPassEquals) {
          throw new BadRequestException('invalid password');
        }
      }

      return this.createTokens(dto.email);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private createTokens(email: string): AuthResponseDto {
    const payload: TokenDto = { email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
