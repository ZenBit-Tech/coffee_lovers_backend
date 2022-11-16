import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class ProfileQuestionsDto {
  @ApiProperty({ example: 'Part-Time' })
  @IsOptional()
  @IsString()
  available_time?: string;

  @ApiProperty({
    example: 'I code for 12 years, 6 years of producation exp, I like reading',
  })
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

  @ApiProperty({ example: 'I studied computer sciency at MIT' })
  @IsOptional()
  @IsString()
  education_descr?: string;

  @ApiProperty({ example: '2010' })
  @IsOptional()
  @IsString()
  education_from?: string;

  @ApiProperty({ example: '2015' })
  @IsOptional()
  @IsString()
  education_to?: string;

  @ApiProperty({ example: 'Worked at Google, PERN stack' })
  @IsOptional()
  @IsString()
  work_history_descr?: string;

  @ApiProperty({ example: '2020' })
  @IsOptional()
  @IsString()
  work_history_from?: string;

  @ApiProperty({ example: '2022' })
  @IsOptional()
  @IsString()
  work_history_to?: string;
}
