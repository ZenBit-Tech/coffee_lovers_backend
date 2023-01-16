import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  conversation: number;

  @ApiProperty({ example: 'Hello, world!' })
  @IsString()
  message: string;

  @IsBoolean()
  is_read?: boolean;
}
