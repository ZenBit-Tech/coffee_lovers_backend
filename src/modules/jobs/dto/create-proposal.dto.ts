import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export default class CreateProposalDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  job: number;

  @ApiProperty({ example: 50 })
  @IsOptional()
  @IsNumber()
  hourly_rate?: number;

  @ApiProperty({ example: 'Hello, I am Full-Stack developer' })
  @IsOptional()
  @IsString()
  cover_letter?: string;
}
