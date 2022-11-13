import { IsOptional, IsString, Matches, MinLength } from 'class-validator';
import {
  passwordMinLength,
  passwordValidationMessage,
  passwordValidationRexExp,
} from '@/modules/user/constants';

export default class UpdateUserDto {
  @IsOptional()
  @MinLength(passwordMinLength)
  @Matches(passwordValidationRexExp, {
    message: passwordValidationMessage,
  })
  password?: string;

  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsOptional()
  @IsString()
  profile_image?: string;

  @IsOptional()
  @IsString()
  reset_password_key?: string;
}
