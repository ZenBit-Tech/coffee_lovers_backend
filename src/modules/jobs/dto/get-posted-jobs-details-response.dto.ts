import { ApiProperty } from '@nestjs/swagger';
import { Contract } from '@entities/Contract.entity';
import { Job } from '@entities/Job.entity';

export default class GetPostedJobsDetailsResponse {
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
      owner: {
        id: 1,
        email: 'kukserg123@gmail.com',
        first_name: 'Serhii',
        last_name: 'Kukharchuk',
        profile_image: 'img/660ba6e4-557b-4033-8e79-656ea305f342.jpg',
      },
      category: {
        id: 1,
        name: 'JavaScript',
      },
      skills: [
        {
          id: 1,
          name: 'HTML',
        },
        {
          id: 2,
          name: 'CSS',
        },
        {
          id: 4,
          name: 'Web development',
        },
      ],
    },
  })
  job: Job;

  @ApiProperty({
    example: [
      {
        id: 3,
        created_at: '2022-12-26T14:08:47.807Z',
        status: 'Active',
        end: '2022-12-26T14:08:47.807Z',
        offer: {
          id: 1,
          hourly_rate: 30,
          status: 'Accepted',
          start: '2022-12-26T12:29:05.652Z',
          created_at: '2022-12-21T15:38:55.906Z',
          freelancer: {
            id: 2,
            email: 'test@test.com',
            first_name: 'John',
            last_name: 'Doe',
            profile_image: 'img/63a1fd5c-a9f9-40a0-88bf-5e9620e016e1.jpg',
            available_time: 'Full-Time',
            position: 'Full-Stack Developer',
            english_level: 'Intermediate',
          },
        },
      },
    ],
  })
  hires: Contract[];
}
