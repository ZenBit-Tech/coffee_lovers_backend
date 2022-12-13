import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export default class PasswordResetRequestDto {
  @ApiProperty({ example: 'test@test.com' })
  @IsEmail({ message: 'invalid email' })
  @IsNotEmpty()
  email: string;
}
