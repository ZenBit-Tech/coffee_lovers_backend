import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { OfferStatus } from '@/common/constants/entities';

export default class OfferBody {
  @ApiProperty({ example: 20 })
  @IsNumber()
  hourly_rate: number;

  @ApiProperty({ example: 20 })
  @IsOptional()
  @IsString()
  status: OfferStatus;
}
