import { IsArray, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FindOperator } from 'typeorm';
import { Skill } from '@/common/entities/Skill.entity';
import { EnglishLevel } from '@/common/constants/entities';

export default class JobParamsDto {
  @ApiProperty({ example: 30 })
  @IsOptional()
  @IsNumber()
  hourly_rate?: number;

  @ApiProperty({ example: 10 })
  @IsOptional()
  @IsArray()
  available_time?: number;

  @ApiProperty({ example: [{ id: 345, name: 'Css' }] })
  @IsOptional()
  @IsArray()
  skills?: Skill[];

  english_level:
    | EnglishLevel
    | FindOperator<EnglishLevel.NO_ENGLISH>
    | FindOperator<EnglishLevel.PRE_INTERMEDIATE>
    | FindOperator<EnglishLevel.INTERMEDIATE>
    | FindOperator<EnglishLevel.UPPER_INTERMEDIATE>;
}
