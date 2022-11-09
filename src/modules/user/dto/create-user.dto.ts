import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  MinLength,
  Matches,
} from 'class-validator';

export default class CreateUserDto {
  @ApiProperty({ example: 'test@test.com' })
  @IsEmail({ message: 'invalid email' })
  readonly email: string;

  @ApiProperty({ example: 'qwerty123' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @MinLength(4)
  @Matches(/(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password must contain uppercase and lowercase letters',
  })
  readonly password?: string;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly first_name?: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly last_name?: string;

  @IsBoolean()
  @IsOptional()
  readonly is_google?: boolean;
}
