import { ApiProperty } from '@nestjs/swagger';
import { Job } from '@entities/Job.entity';

export default class getAvailableJobs {
  @ApiProperty({
    example: {
      id: 4566395,
      title: 'Create react app',
      description: 'In order to save photos',
      hourly_rate: 20,
      available_time: 'Part-Time',
      english_level: 'No English',
      created_at: null,
      offersCount: 1,
      conversationsCount: 1,
      requestsCount: 1,
    },
  })
  job: Job;
}
