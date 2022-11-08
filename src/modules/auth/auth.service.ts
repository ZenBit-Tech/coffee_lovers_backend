import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from '@entities/RefreshToken.entity';
import { Repository } from 'typeorm';
import { UserService } from '@/modules/user/user.service';
import CreateUserDto from '@/modules/user/dto/create-user.dto';
import SignInDto from '@/modules/auth/dto/signIn.dto';
import RefreshDto from '@/modules/auth/dto/refresh.dto';
import TokenDto from '@/modules/auth/dto/token.dto';
import { AuthResponse } from '@/modules/auth/types';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService)
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async signUp(dto: CreateUserDto): Promise<AuthResponse> {
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

  async signIn(dto: SignInDto): Promise<AuthResponse> {
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

  async refreshToken(dto: RefreshDto): Promise<AuthResponse> {
    try {
      const payload = await this.verifyRefreshToken(dto.token);
      return this.createTokens(payload.email, dto.token);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private createTokens(email: string, refreshToken?: string): AuthResponse {
    const newRefreshToken = this.jwtService.sign(
      { email, isRefresh: true },
      {
        expiresIn: '30d',
      },
    );
    this.saveRefreshToken(email, newRefreshToken, refreshToken);
    return {
      access_token: this.jwtService.sign({ email, isRefresh: false }),
      refresh_token: newRefreshToken,
    };
  }

  private async saveRefreshToken(
    email: string,
    token: string,
    oldToken?: string,
  ): Promise<void> {
    try {
      const user = await this.userService.findByEmail(email);
      if (!user) {
        throw new BadRequestException();
      }
      await this.refreshTokenRepository
        .createQueryBuilder()
        .delete()
        .from(RefreshToken)
        .where({ token: oldToken })
        .execute();
      await this.refreshTokenRepository
        .createQueryBuilder()
        .insert()
        .into(RefreshToken)
        .values([{ token, user_id: user }])
        .execute();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private async verifyRefreshToken(token: string): Promise<TokenDto> {
    try {
      const data = await this.refreshTokenRepository
        .createQueryBuilder()
        .select('id')
        .from(RefreshToken, 'id')
        .where({ token })
        .getOne();
      if (!data) {
        throw new UnauthorizedException();
      }
      const payload: TokenDto = await this.jwtService.verify(token);
      return payload;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
