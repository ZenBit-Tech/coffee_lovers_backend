import { ApiProperty } from '@nestjs/swagger';
import { User } from '@entities/User.entity';

export class GetMessagesResponse {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Hello, world!' })
  message: string;

  @ApiProperty({ example: '2022-12-08T21:29:17.177Z' })
  created_at: string;

  @ApiProperty({ example: false })
  is_read: boolean;

  @ApiProperty({
    example: {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      profile_image: 'img/fb613fb9-109e-4ae7-bf2b-17b33efec3b4.jpeg',
    },
  })
  from: User;
}
