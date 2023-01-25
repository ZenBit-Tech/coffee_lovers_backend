import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class SetJobOwnerRatingDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  job_owner_id: number;

  @ApiProperty({ example: 5 })
  @IsNumber()
  rating: number;

  @ApiProperty({ example: 'very good freelancer' })
  @IsOptional()
  @IsString()
  rating_comment?: string;

  @ApiProperty({ example: 10 })
  @IsNumber()
  job_id: number;
}
