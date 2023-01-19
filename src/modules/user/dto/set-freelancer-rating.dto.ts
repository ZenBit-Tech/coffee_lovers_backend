import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class SetFreelancerRatingDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  freelancer_id: number;

  @ApiProperty({ example: 5 })
  @IsNumber()
  freelancer_rating: number;

  @ApiProperty({ example: 'very good freelancer' })
  @IsOptional()
  @IsString()
  rating_comment?: string;

  @ApiProperty({ example: 10 })
  @IsNumber()
  job_id: number;
}
