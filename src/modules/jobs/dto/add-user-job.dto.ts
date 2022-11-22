import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EnglishLevel } from '@/common/constants/entities';
import { Category } from '@/common/entities/Category.entity';
import { Skill } from '@/common/entities/Skill.entity';

export default class AddJobDescriptionDto {
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

  @ApiProperty({ example: 4 })
  @IsOptional()
  @IsNumber()
  available_time?: number;

  // @ApiProperty({ example: 4 })
  // @IsOptional()
  // @IsNumber()
  // category?: Category;

  // @ApiProperty({ example: 'Upper-intermadiate' })
  // @IsOptional()
  // @IsString()
  // english_level?: EnglishLevel;

  // @ApiProperty({ example: 'Upper-intermadiate' })
  // @IsOptional()
  // @IsString()
  // skills?: Skill;
}
