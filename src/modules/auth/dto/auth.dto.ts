import { IsEmail, IsString } from 'class-validator';

export default class AuthDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}
