import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { RequestType } from '@/common/constants/entities';

export default class ReqBody {
  @ApiProperty({ example: 'Proposal' })
  @IsString()
  type: RequestType;

  @ApiProperty({ example: 20 })
  @IsNumber()
  hourly_rate: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  job_id: number;

  @ApiProperty({ example: false })
  @IsOptional()
  @IsBoolean()
  reject: boolean;

  @ApiProperty({ example: 'Your cover letter with skills description' })
  @IsString()
  cover_letter: string;
}
