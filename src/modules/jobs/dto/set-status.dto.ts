import { JobStatus } from '@constants/entities';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';

export default class SetStatusDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  jobId: number;

  @ApiProperty({
    example: 'InProgress',
    description: 'Pending, InProgress, Finished',
  })
  @IsEnum(JobStatus)
  status: JobStatus;
}
