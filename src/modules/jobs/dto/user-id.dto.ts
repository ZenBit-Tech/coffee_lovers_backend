import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class JobIdDto {
  @ApiProperty({ example: 334993 })
  @IsString()
  id?: string;
}
