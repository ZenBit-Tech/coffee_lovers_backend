import { ApiProperty } from '@nestjs/swagger';
import { User } from '@entities/User.entity';
import { Job } from '@entities/Job.entity';
import { Message } from '@entities/Message.entity';

export class GetConversationsResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({
    example: {
      id: 1,
      title: 'Freelance platform',
      description: 'Create freelance platform',
    },
  })
  job: Job;

  @ApiProperty({
    example: {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      profile_image: 'img/fb613fb9-109e-4ae7-bf2b-17b33efec3b4.jpeg',
    },
  })
  user: User;

  @ApiProperty({
    example: {
      id: 1,
      message: 'Hello, world!',
      created_at: '2022-12-08T21:29:17.177Z',
      is_read: false,
    },
  })
  last_message: Message;

  @ApiProperty({ example: 4, description: 'amount of unread messages' })
  new_messages: number;
}
