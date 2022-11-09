import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export default class CreateUserDto {
  @ApiProperty({ example: 'test@test.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'qwerty123' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly password?: string;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  @IsString()
  readonly first_name: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  @IsString()
  readonly last_name: string;

  @IsBoolean()
  @IsOptional()
  readonly is_google?: boolean;
}
