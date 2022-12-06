import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '@entities/User.entity';
import { Job } from '@entities/Job.entity';
import { coverLetterMaxLength } from '../constants/entities';

@Entity()
export class Proposal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null, nullable: true })
  hourly_rate: number;

  @Column({
    type: 'varchar',
    length: coverLetterMaxLength,
    default: null,
    nullable: true,
  })
  cover_letter: string;

  @ManyToOne(() => User, (user) => user.proposals)
  user: User;

  @ManyToOne(() => Job, (job) => job.proposals)
  job: Job;
}
