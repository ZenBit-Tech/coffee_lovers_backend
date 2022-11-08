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
  readonly first_name: string;

  @IsNotEmpty()
  @IsString()
  readonly last_name: string;

  @IsBoolean()
  @IsOptional()
  readonly is_google?: boolean;
}
