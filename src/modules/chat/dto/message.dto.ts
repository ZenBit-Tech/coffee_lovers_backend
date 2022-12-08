import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CreateMessageDto } from './create-message.dto';

export class MessageDto extends CreateMessageDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  from: number;
}
