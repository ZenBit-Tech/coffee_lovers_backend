import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class GetMessagesDto {
  @ApiProperty({ example: 1 })
  @IsNumberString()
  id: number;
}
