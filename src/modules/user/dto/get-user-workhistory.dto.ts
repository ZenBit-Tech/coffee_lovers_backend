import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import AddUserWorkhistoryDto from './add-user-workhistory.dto';

export default class GetUserWorkhistoryDto extends AddUserWorkhistoryDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;
}
