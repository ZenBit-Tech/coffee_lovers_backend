import { ApiProperty } from '@nestjs/swagger';

export default class UserDto {
  @ApiProperty({ example: 'test@test.com' })
  email: string;

  @ApiProperty({ example: 'John' })
  first_name: string;

  @ApiProperty({ example: 'Doe' })
  last_name: string;

  @ApiProperty({ example: '' })
  profile_image: string;

  @ApiProperty({ example: '' })
  available_time: string;

  @ApiProperty({ example: '' })
  position: string;

  @ApiProperty({ example: '' })
  hourly_rate: number;

  @ApiProperty({ example: '' })
  category_id?: number;
}
