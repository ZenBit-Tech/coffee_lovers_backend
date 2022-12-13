import { IsArray, IsNumberString, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EnglishLevel } from '@constants/entities';

export default class GetFreelancerDto {
  @ApiProperty({ example: 10 })
  @IsOptional()
  @IsNumberString()
  take: number;

  @ApiProperty({ example: 10 })
  @IsOptional()
  @IsNumberString()
  skip: number;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsNumberString()
  page: number;

  @ApiProperty({ example: [1, 2, 3] })
  @IsOptional()
  @IsArray()
  skills?: number[];

  @ApiProperty({ example: [1, 2, 3] })
  @IsOptional()
  @IsArray()
  categories?: number[];

  @ApiProperty({ example: 20 })
  @IsOptional()
  @IsNumberString()
  hourly_rate_start?: number;

  @ApiProperty({ example: 40 })
  @IsOptional()
  @IsNumberString()
  hourly_rate_end?: number;

  @ApiProperty({ example: 8 })
  @IsOptional()
  @IsNumberString()
  available_time?: number;

  @ApiProperty({ example: EnglishLevel.INTERMEDIATE })
  @IsOptional()
  @IsString()
  english_level?: EnglishLevel;

  @ApiProperty({ example: 'Website' })
  @IsOptional()
  @IsString()
  search?: string;
}
