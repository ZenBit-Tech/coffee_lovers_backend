import { Job } from '@entities/Job.entity';
import { User } from '@entities/User.entity';
import { ApiProperty } from '@nestjs/swagger';
import { NotificationType } from '@/modules/notifications/types';
import { mockFreelancer1 } from '@/common/mocks/users';
import { mockJob1 } from '@/common/mocks/jobs';

export default class NotificationResponseDto {
  @ApiProperty({ example: NotificationType.MESSAGE })
  type: NotificationType;

  @ApiProperty({ example: mockFreelancer1 })
  user?: User;

  @ApiProperty({ example: mockJob1 })
  job?: Job;

  @ApiProperty({ example: 'Hello, World!' })
  message?: string;
}
