import { IsEmail } from 'class-validator';

export default class AccessTokenDto {
  @IsEmail()
  readonly email: string;
}
