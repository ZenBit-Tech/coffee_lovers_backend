import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsDate, IsString, IsObject } from 'class-validator';
import { User } from '@/common/entities/User.entity';
import { mockFreelancer1 } from '@/common/mocks/users';

export default class GetJobOwnerRating {
  @ApiProperty({
    example: mockFreelancer1,
  })
  @IsObject()
  job_owner: User;

  @ApiProperty({ example: '2023-01-18 18:32:36.133287' })
  @IsString()
  created_at: Date;

  @ApiProperty({
    example: mockFreelancer1,
  })
  @IsObject()
  freelancer: User;
}
