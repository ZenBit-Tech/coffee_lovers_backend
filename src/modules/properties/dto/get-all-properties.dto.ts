import { ApiProperty } from '@nestjs/swagger';
import PropertyDto from './property-dto';

export default class GetAllPropertiesDto {
  @ApiProperty({ example: [{ id: 1, name: 'JavaScript' }] })
  readonly categories: PropertyDto[];

  @ApiProperty({ example: [{ id: 1, name: 'HTML' }] })
  readonly skills: PropertyDto[];

  @ApiProperty({ example: ['Pre-Intermediate, Intermediate'] })
  readonly englishLevels: string[];

  @ApiProperty({ example: ['Full-Time, Part-Time'] })
  readonly availableTime: string[];

  @ApiProperty({ example: ['Month, Week'] })
  readonly durationAmount: string[];
}
