import { ApiProperty } from '@nestjs/swagger';
import { Contract } from '@entities/Contract.entity';
import { Job } from '@entities/Job.entity';
import { mockContract1, mockJob1, mockOffer1 } from '@/common/mocks/jobs';
import { mockFreelancer1, mockJobOwner1 } from '@/common/mocks/users';
import {
  mockCategory1,
  mockSkill1,
  mockSkill2,
  mockSkill3,
} from '@/common/mocks/properties';

export default class GetPostedJobsDetailsResponse {
  @ApiProperty({
    example: {
      ...mockJob1,
      owner: mockJobOwner1,
      category: mockCategory1,
      skills: [mockSkill1, mockSkill2, mockSkill3],
    },
  })
  job: Job;

  @ApiProperty({
    example: [
      {
        ...mockContract1,
        offer: {
          ...mockOffer1,
          freelancer: mockFreelancer1,
        },
      },
    ],
  })
  hires: Contract[];
}
