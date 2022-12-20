import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export default class getJobInfoParamsDto {
  @ApiProperty({ example: 1 })
  @IsNumberString()
  id: string;
}
