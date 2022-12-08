import { IsNumber, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsNumber()
  conversation: number;

  @IsString()
  message: string;
}
