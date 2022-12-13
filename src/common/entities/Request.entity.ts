import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@entities/User.entity';
import { Job } from '@entities/Job.entity';
import { coverLetterMaxLength, RequestType } from '@constants/entities';

@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: RequestType,
    nullable: true,
    default: null,
  })
  type: RequestType;

  @ManyToOne(() => Job, (job) => job.requests)
  job: Job;

  @ManyToOne(() => User, (user) => user.requests)
  job_owner: User;

  @ManyToOne(() => User, (user) => user.requests)
  freelancer: User;

  @Column({ default: null, nullable: true })
  hourly_rate: number;

  @Column({ default: false, nullable: true })
  rejected: boolean;

  @Column({
    type: 'varchar',
    length: coverLetterMaxLength,
    default: null,
    nullable: true,
  })
  cover_letter: string;

  @CreateDateColumn()
  created_at: Date;
}
