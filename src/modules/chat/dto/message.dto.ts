import { IsNumber } from 'class-validator';
import { CreateMessageDto } from './create-message.dto';

export class MessageDto extends CreateMessageDto {
  @IsNumber()
  from: number;
}
