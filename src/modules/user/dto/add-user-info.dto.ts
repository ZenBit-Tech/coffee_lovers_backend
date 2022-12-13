import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional } from 'class-validator';
import UpdateUserDto from './update-user.dto';

export default class AddUserInfoDto extends UpdateUserDto {
  @ApiProperty({ example: [1, 2, 3] })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  skills?: number[];
}
