import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { coverLetterMaxLength, RequestType } from '@/common/constants/entities';

export default class ReqBody {
  @ApiProperty({ example: 'Proposal' })
  @IsString()
  type: RequestType;

  @ApiProperty({ example: 20 })
  @IsNumber()
  hourly_rate: number;

  @ApiProperty({ example: false })
  @IsOptional()
  @IsBoolean()
  reject: boolean;

  @ApiProperty({ example: 'Hello world' })
  @IsOptional()
  @MaxLength(coverLetterMaxLength)
  @IsString()
  cover_letter: string;
}
