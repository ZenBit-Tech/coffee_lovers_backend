import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export default class SignInDto {
  @ApiProperty({ example: 'test@test.com' })
  @IsEmail({ message: 'invalid email' })
  readonly email: string;

  @ApiProperty({ example: 'qwerty123' })
  @IsOptional()
  @IsString()
  readonly password?: string;

  @IsBoolean()
  @IsOptional()
  readonly is_google?: boolean;
}
