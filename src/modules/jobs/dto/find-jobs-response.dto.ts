import { ApiProperty } from '@nestjs/swagger';
import { Job } from '@entities/Job.entity';

export default class FindJobsResponse {
  @ApiProperty({
    example: [
      {
        id: 1,
        title: 'Test job',
        description: 'this is test job',
        hourly_rate: 25,
        available_time: 8,
        english_level: 'Intermediate',
        created_at: '2022-11-25T22:24:28.682Z',
        owner: {
          id: 1,
          email: 'johndoe@test.com',
          first_name: 'John',
          last_name: 'Doe',
        },
        category: {
          id: 1,
          name: 'JavaScript',
        },
      },
    ],
  })
  jobs: Job[];

  @ApiProperty({
    example: { totalCount: 1 },
  })
  meta: {
    totalCount: number;
  };
}
