import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AvailableTime, EnglishLevel } from '@constants/entities';

export default class UpdateJobDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'Landing page' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ example: 'I need create landing page' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 50 })
  @IsOptional()
  @IsNumber()
  hourly_rate?: number;

  @ApiProperty({ example: 'Full-Time' })
  @IsOptional()
  @IsString()
  available_time?: AvailableTime;

  @ApiProperty({ example: 'Upper-Intermediate' })
  @IsOptional()
  @IsString()
  english_level?: EnglishLevel;

  @ApiProperty({ example: [1, 2, 3] })
  @IsOptional()
  @IsArray()
  skills?: number[];
}
