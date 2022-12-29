import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class AddUserEducationDto {
  @ApiProperty({ example: 'I studied computer sciency at MIT' })
  @IsString()
  education_descr: string;

  @ApiProperty({ example: '2010' })
  @IsString()
  education_from: string;

  @ApiProperty({ example: '2015' })
  @IsString()
  education_to: string;
}
