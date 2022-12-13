import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  conversation: number;

  @ApiProperty({ example: 'Hello, world!' })
  @IsString()
  message: string;
}
