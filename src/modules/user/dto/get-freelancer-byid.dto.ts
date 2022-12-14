import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import AddUserEducationDto from './add-user-education.dto';
import AddUserWorkhistoryDto from './add-user-workhistory.dto';
import UserDto from './user.dto';

export default class GetUserInfoByIdDto extends UserDto {
  @ApiProperty({ example: 123 })
  @IsOptional()
  educations: AddUserEducationDto[];

  @IsOptional()
  @ApiProperty({ example: 123 })
  WorkHistory: AddUserWorkhistoryDto[];
}
