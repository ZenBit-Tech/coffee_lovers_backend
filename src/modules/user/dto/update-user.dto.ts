import {
  IsOptional,
  IsString,
  Matches,
  MinLength,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AvailableTime, EnglishLevel, Role } from '@constants/entities';
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

  @ApiProperty({ example: 'Full-Time' })
  @IsOptional()
  @IsString()
  available_time?: AvailableTime;

  @ApiProperty({ example: 'I am hard-working person, like reading' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 12 })
  @IsOptional()
  @IsNumber()
  hourly_rate?: number;

  @ApiProperty({ example: 'Full-Stack Developer' })
  @IsOptional()
  @IsString()
  position?: string;

  @ApiProperty({ example: '1C Development, UX/UI educational exp' })
  @IsOptional()
  @IsString()
  other_experience?: string;

  @ApiProperty({ example: 'Intermediate' })
  @IsOptional()
  @IsString()
  english_level?: EnglishLevel;

  @ApiProperty({ example: 10 })
  @IsOptional()
  @IsNumber()
  category_id?: number;

  @ApiProperty({ example: 'Freelancer' })
  @IsOptional()
  @IsString()
  role?: Role;
}
