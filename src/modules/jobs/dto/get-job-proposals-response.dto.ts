import { ApiProperty } from '@nestjs/swagger';
import { User } from '@entities/User.entity';
import { Job } from '@entities/Job.entity';

export default class getJobProposalsResponseDto {
  @ApiProperty({
    example: {
      id: 1,
      title: 'Test job',
      description: 'This is test job',
      hourly_rate: 50,
      available_time: 'Full-time',
      english_level: 'Intermediate',
      created_at: '2022-11-27T14:44:05.241Z',
    },
  })
  job: Job;

  @ApiProperty({
    example: [
      {
        id: 1,
        hourly_rate: 30,
        cover_letter: 'Hello, it is test proposal',
        user: {
          id: 1,
          email: 'johndoe@test.com',
          first_name: 'John',
          last_name: 'Doe',
        },
      },
    ],
  })
  proposals: {
    id: number;
    hourly_rate: number;
    cover_letter: string;
    user: User;
  }[];
}
