import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import UpdateUserDto from './update-user.dto';

export default class AddUserInfoDto extends UpdateUserDto {
  @ApiProperty({ example: 10 })
  @IsOptional()
  skills?: number[];
}
