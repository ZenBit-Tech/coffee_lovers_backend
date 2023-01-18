import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class TypeMessageDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  conversation: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  to: number;
}
