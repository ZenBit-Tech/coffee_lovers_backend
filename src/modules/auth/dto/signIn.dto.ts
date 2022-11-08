import { IsEmail, IsOptional, IsString } from 'class-validator';

export default class SignInDto {
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsString()
  readonly password?: string;
}
