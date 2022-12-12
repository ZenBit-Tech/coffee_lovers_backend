import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import AddUserEducationDto from './add-user-education.dto';

export default class GetUserEducationDto extends AddUserEducationDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;
}
