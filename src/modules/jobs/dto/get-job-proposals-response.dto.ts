import { ApiProperty } from '@nestjs/swagger';
import { User } from '@entities/User.entity';

export default class getJobProposalsResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 30 })
  hourly_rate: number;

  @ApiProperty({ example: 'Hello, it is test proposal' })
  cover_letter: string;

  @ApiProperty({
    example: {
      id: 1,
      email: 'johndoe@test.com',
      first_name: 'John',
      last_name: 'Doe',
    },
  })
  user: User;
}
