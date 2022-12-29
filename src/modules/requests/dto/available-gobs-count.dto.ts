import { Category } from '@entities/Category.entity';
import { ApiProperty } from '@nestjs/swagger';

export default class GetAvailableJobsAndCount {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Freelance platform' })
  title: string;

  @ApiProperty({ example: 'Test project' })
  description: string;

  @ApiProperty({ example: 20 })
  hourly_rate: number;

  @ApiProperty({ example: 'Part-Time' })
  available_time: string;

  @ApiProperty({ example: 'Intermediate' })
  english_level: string;

  @ApiProperty({ example: '2022-12-06T11:03:53.945Z' })
  created_at: Date;

  @ApiProperty({
    example: {
      id: 1,
      name: 'JavaScript',
    },
  })
  category: Category;

  @ApiProperty({ example: 3 })
  count: number;
}
