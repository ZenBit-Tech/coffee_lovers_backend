import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class ProfileQuestionsDto {
  @ApiProperty({ example: 'Part-Time' })
  @IsOptional()
  available_time: string;

  @ApiProperty({
    example: 'I code for 12 years, 6 years of producation exp, I like reading',
  })
  @IsOptional()
  description: string;

  @ApiProperty({ example: 12 })
  @IsOptional()
  hourly_rate: number;

  @ApiProperty({ example: 'Full-Stack Developer' })
  @IsOptional()
  position: string;

  @ApiProperty({ example: 'I studied computer sciency at MIT' })
  @IsOptional()
  education_descr: string;

  @ApiProperty({ example: '2010' })
  @IsOptional()
  education_from: string;

  @ApiProperty({ example: '2015' })
  @IsOptional()
  education_to: string;

  @ApiProperty({ example: 'Worked at Google, PERN stack' })
  @IsOptional()
  work_history_descr: string;

  @ApiProperty({ example: '2020' })
  @IsOptional()
  work_history_from: string;

  @ApiProperty({ example: '2022' })
  @IsOptional()
  work_history_to: string;
}
