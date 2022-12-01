import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@constants/entities';

export default class UserDto {
  @ApiProperty({ example: 123 })
  id: number;

  @ApiProperty({ example: 'test@test.com' })
  email: string;

  @ApiProperty({ example: 'John' })
  first_name: string;

  @ApiProperty({ example: 'Doe' })
  last_name: string;

  @ApiProperty({ example: 'https://localhost:4200/image.img' })
  profile_image: string;

  @ApiProperty({ example: 'Freelancer' })
  role: Role;

  @ApiProperty({ example: '4' })
  available_time: string;

  @ApiProperty({ example: 'Front-end developer' })
  position: string;

  @ApiProperty({ example: 30 })
  hourly_rate: number;

  @ApiProperty({ example: 377 })
  category_id?: number;
}
