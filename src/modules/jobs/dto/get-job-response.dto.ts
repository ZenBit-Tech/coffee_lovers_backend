import { ApiProperty } from '@nestjs/swagger';
import { Job } from '@entities/Job.entity';
import { Category } from '@/common/entities/Category.entity';

export default class getJobByIdResponseDto {
  @ApiProperty({
    example: {
      id: 1,
      title: 'Test job',
      description: 'This is test job',
      hourly_rate: 50,
      available_time: 'Full-time',
      english_level: 'Intermediate',
      created_at: '2022-11-27T14:44:05.241Z',
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
  })
  job: Job;
}
