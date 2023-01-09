import { ApiProperty } from '@nestjs/swagger';
import { Job } from '@entities/Job.entity';

export default class getJobsWithoutOffer {
  @ApiProperty({
    example: {
      id: 4566395,
      title: 'Create react app',
      description: 'In order to save photos',
      hourly_rate: 20,
      available_time: 'Part-Time',
      english_level: 'No English',
      created_at: null,
      count: 1,
    },
  })
  job: Job;
}
