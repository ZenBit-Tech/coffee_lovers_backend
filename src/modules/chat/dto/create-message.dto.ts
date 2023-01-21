import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  conversation: number;

  @ApiProperty({ example: 'Hello, world!' })
  @IsString()
  message: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  to: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  job: number;

  @IsOptional()
  @IsBoolean()
  is_read?: boolean;
}
