import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ConversationDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  conversation: number;
}
