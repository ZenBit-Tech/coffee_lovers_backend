import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Contract } from '@/common/entities/Contract.entity';

export default class GetHiresDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  totalCount: number;

  @ApiProperty({
    example: {
      id: 3,
      status: 'Closed',
      created_at: '2022-11-27T14:44:05.241Z',
      end: '2022-11-27T14:44:05.241Z',
      offer: {
        id: 60,
        hourly_rate: 15,
        status: 'Declined',
        start: '2022-12-22T17:23:02.956Z',
        created_at: '2022-12-24T10:52:34.000Z',
        job: {
          id: 4566393,
          title: 'landing',
          description: 'job descr',
          hourly_rate: 20,
          available_time: 'Full-Time',
          english_level: 'Upper-Intermediate',
          duration: null,
          duration_amount: null,
          status: 'Pending',
          created_at: null,
        },
      },
      freelancer: {
        id: 5,
        email: 'kasircivanna@gmail.com',
        first_name: 'Ivanna',
        last_name: 'Kashyrets',
        profile_image: 'http://localhost:4200/index.jpg',
        available_time: null,
        description: 'ipsim lorem x20',
        hourly_rate: 20,
        position: 'Full-stack developer',
        other_experience: null,
        english_level: 'Pre-Intermediate',
        role: 'Freelancer',
      },
    },
  })
  allHiredFreelancers: Contract[];
}
