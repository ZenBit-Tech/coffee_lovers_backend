import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export default class SignInDto {
  @ApiProperty({ example: 'test@test.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'qwerty123' })
  @IsOptional()
  @IsString()
  readonly password?: string;
}
