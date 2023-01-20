import {
  IsArray,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
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
  @IsNumberString({}, { each: true })
  skills?: number[];

  @ApiPropertyOptional({ example: [1, 2, 3] })
  @IsOptional()
  @IsArray()
  @IsNumberString({}, { each: true })
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
  @IsEnum(AvailableTime)
  available_time?: AvailableTime;

  @ApiPropertyOptional({ example: EnglishLevel.INTERMEDIATE })
  @IsOptional()
  @IsEnum(EnglishLevel)
  english_level?: EnglishLevel;

  @ApiPropertyOptional({ example: 'Website' })
  @IsOptional()
  @IsString()
  search?: string;
}
