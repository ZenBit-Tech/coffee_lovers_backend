import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { ChatEvents } from '@/common/constants/websocket';

export class TypeMessageDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  conversation: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  type: ChatEvents;

  @ApiProperty({ example: 1 })
  @IsNumber()
  to: number;
}
