import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class AddUserWorkhistoryDto {
  @ApiProperty({ example: 'Worked at Google, PERN stack' })
  @IsOptional()
  @IsString()
  work_history_descr?: string;

  @ApiProperty({ example: '2020' })
  @IsOptional()
  @IsString()
  work_history_from?: string;

  @ApiProperty({ example: '2022' })
  @IsOptional()
  @IsString()
  work_history_to?: string;
}
