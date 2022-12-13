import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  passwordMinLength,
  passwordValidationMessage,
  passwordValidationRexExp,
} from '@/modules/user/constants';

export default class PasswordResetDto {
  @ApiProperty({ example: 'Qwerty123' })
  @MinLength(passwordMinLength)
  @Matches(passwordValidationRexExp, {
    message: passwordValidationMessage,
  })
  password: string;

  @ApiProperty({ example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d' })
  @IsString()
  @IsNotEmpty()
  key: string;
}
