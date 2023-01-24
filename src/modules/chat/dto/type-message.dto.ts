import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { ChatEvents } from '@/common/constants/websocket';

export class TypeMessageDto {
  @ApiProperty({ example: 'endtype' })
  @IsNumber()
  type: ChatEvents;

  @ApiProperty({ example: 3 })
  @IsNumber()
  to: number;
}
