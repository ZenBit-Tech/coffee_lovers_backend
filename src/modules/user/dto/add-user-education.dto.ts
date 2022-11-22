import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class AddUserEducationDto {
  @ApiProperty({ example: 'I studied computer sciency at MIT' })
  @IsOptional()
  @IsString()
  education_descr?: string;

  @ApiProperty({ example: '2010' })
  @IsOptional()
  @IsString()
  education_from?: string;

  @ApiProperty({ example: '2015' })
  @IsOptional()
  @IsString()
  education_to?: string;
}
