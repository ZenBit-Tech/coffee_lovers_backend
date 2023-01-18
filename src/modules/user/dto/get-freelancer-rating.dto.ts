import { ApiProperty } from '@nestjs/swagger';
import { User } from '@/common/entities/User.entity';
import { mockFreelancer1 } from '@/common/mocks/users';

export default class GetFreelancerRating {
  @ApiProperty({
    example: mockFreelancer1,
  })
  freelancer: User;

  @ApiProperty({ example: 8 })
  created_at: Date;

  @ApiProperty({
    example: mockFreelancer1,
  })
  job_owner: User;
}
