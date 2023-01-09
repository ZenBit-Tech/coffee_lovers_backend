import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { coverLetterMaxLength, OfferStatus } from '@/common/constants/entities';

export default class OfferBody {
  @ApiProperty({ example: 20 })
  @IsNumber()
  hourly_rate: number;

  @ApiProperty({ example: 20 })
  @IsOptional()
  @IsString()
  status: OfferStatus;

  @ApiProperty({ example: 'Hello world' })
  @IsOptional()
  @MaxLength(coverLetterMaxLength)
  @IsString()
  cover_letter: string;
}
