import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import UpdateUserDto from './update-user.dto';

export default class AddUserInfoDto extends UpdateUserDto {
  @ApiProperty({ example: [1, 2, 4] })
  @IsOptional()
  skills?: number[];

  @ApiProperty({ example: 2 })
  @IsOptional()
  category_id?: number;
}
