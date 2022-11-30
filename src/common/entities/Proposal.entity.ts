import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '@entities/User.entity';
import { Job } from '@entities/Job.entity';

@Entity()
export class Proposal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null, nullable: true })
  hourly_rate: number;

  @Column({ default: null, nullable: true })
  cover_letter: string;

  @ManyToOne(() => User, (user) => user.proposals)
  user: User;

  @ManyToOne(() => Job, (job) => job.proposals)
  job: Job;
}
