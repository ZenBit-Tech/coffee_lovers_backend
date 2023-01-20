import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional } from 'class-validator';
import UpdateUserDto from './update-user.dto';

export default class AddUserInfoDto extends UpdateUserDto {
  @ApiProperty({ example: [1, 2, 4] })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  skills?: number[];

  @ApiProperty({ example: 2 })
  @IsOptional()
  category_id?: number;

  @ApiProperty({ example: 'First name' })
  @IsOptional()
  first_name?: string;

  @ApiProperty({ example: 'Last name' })
  @IsOptional()
  last_name?: string;
}
