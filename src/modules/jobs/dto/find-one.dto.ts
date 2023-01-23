import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export default class FindOneDto {
  @ApiProperty({ example: 1, description: 'job id' })
  @IsNumberString()
  id: number;
}
