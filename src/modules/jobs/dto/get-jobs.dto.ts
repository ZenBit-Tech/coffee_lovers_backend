import { IsArray, IsNumberString, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { AvailableTime, EnglishLevel } from '@constants/entities';

export default class GetJobsDto {
  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsNumberString()
  limit?: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumberString()
  offset?: number;

  @ApiPropertyOptional({ example: [1, 2, 3] })
  @IsOptional()
  @IsArray()
  skills?: number[];

  @ApiPropertyOptional({ example: [1, 2, 3] })
  @IsOptional()
  @IsArray()
  categories?: number[];

  @ApiPropertyOptional({ example: 20 })
  @IsOptional()
  @IsNumberString()
  hourly_rate_start?: number;

  @ApiPropertyOptional({ example: 40 })
  @IsOptional()
  @IsNumberString()
  hourly_rate_end?: number;

  @ApiPropertyOptional({ example: 'Full-Time' })
  @IsOptional()
  @IsString()
  available_time?: AvailableTime;

  @ApiPropertyOptional({ example: EnglishLevel.INTERMEDIATE })
  @IsOptional()
  @IsString()
  english_level?: EnglishLevel;

  @ApiPropertyOptional({ example: 'Website' })
  @IsOptional()
  @IsString()
  search?: string;
}
