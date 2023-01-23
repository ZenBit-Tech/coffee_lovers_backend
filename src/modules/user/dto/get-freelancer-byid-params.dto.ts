import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export default class GetFreelancerByIdParams {
  @ApiProperty({ example: 1 })
  @IsNumberString()
  key: string;
}
