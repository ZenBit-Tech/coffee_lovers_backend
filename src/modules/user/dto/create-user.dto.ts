import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export default class CreateUserDto {
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly password?: string;

  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @IsBoolean()
  @IsOptional()
  readonly isGoogle?: boolean;
}
