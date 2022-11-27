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

  @ApiProperty({ example: '' })
  profile_image: string;

  @ApiProperty({ example: 'Freelancer' })
  role: Role;
}
