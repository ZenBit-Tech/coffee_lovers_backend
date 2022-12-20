import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export default class CreateConversationDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  job: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  user: number;
}
