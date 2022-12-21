import { ApiProperty } from '@nestjs/swagger';
import { Job } from '@entities/Job.entity';
import { OfferStatus } from '@/common/constants/entities';
import { User } from '@/common/entities/User.entity';

export default class GetOffersByUserResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 30 })
  hourly_rate: number;

  @ApiProperty({ example: OfferStatus.PENDING })
  status: OfferStatus;

  @ApiProperty({ example: '2022-12-21T15:38:55.906Z' })
  created_at: string;

  @ApiProperty({
    example: {
      id: 1,
      title: 'Freelance platform',
      description: 'Create freelance platform',
      hourly_rate: 30,
      available_time: 'Full-Time',
      english_level: 'Intermediate',
      status: 'InProgress',
      created_at: '2022-12-06T09:57:29.161Z',
      category: {
        id: 1,
        name: 'JavaScript',
      },
    },
  })
  job: Job;

  @ApiProperty({
    example: {
      id: 1,
      email: 'test@test.com',
      first_name: 'John',
      last_name: 'Doe',
      profile_image: 'img/d3e51fce-fd90-429a-b2bc-a41a9ef2b3a1.jpg',
    },
  })
  job_owner: User;
}
