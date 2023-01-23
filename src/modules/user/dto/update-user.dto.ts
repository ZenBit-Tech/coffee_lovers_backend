import {
  IsOptional,
  IsString,
  Matches,
  MinLength,
  IsNumber,
  IsEnum,
  IsObject,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AvailableTime, EnglishLevel, Role } from '@constants/entities';
import { Category } from '@entities/Category.entity';
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
  @IsEnum(EnglishLevel)
  english_level?: EnglishLevel;

  @ApiProperty({ example: { id: 1, name: 'Android' } })
  @IsOptional()
  @IsObject()
  category?: Category;

  @ApiProperty({ example: 'Freelancer' })
  @IsOptional()
  @IsString()
  role?: Role;

  @ApiProperty({ example: 4.3 })
  @IsOptional()
  @IsNumber()
  average_rating?: number;
}
