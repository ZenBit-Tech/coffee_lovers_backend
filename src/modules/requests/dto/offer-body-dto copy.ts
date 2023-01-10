import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { coverLetterMaxLength, OfferStatus } from '@/common/constants/entities';

export default class OfferBody {
  @ApiProperty({ example: 20 })
  @IsNumber()
  hourly_rate: number;
}
