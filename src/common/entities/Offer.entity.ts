import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Job } from '@entities/Job.entity';
import { User } from '@entities/User.entity';
import { OfferStatus } from '@constants/entities';
import { Contract } from './Contract.entity';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Job, (job) => job.offers)
  job: Job;

  @ManyToOne(() => User, (user) => user.offers)
  job_owner: User;

  @ManyToOne(() => User, (user) => user.offers)
  freelancer: User;

  @Column({ default: null, nullable: true })
  hourly_rate: number;

  @Column({
    type: 'enum',
    enum: OfferStatus,
    nullable: true,
    default: null,
  })
  status: OfferStatus;

  @CreateDateColumn()
  start: Date;

  @OneToOne(() => Contract, (contract) => contract.offer)
  @JoinColumn()
  contract: Contract;

  @CreateDateColumn()
  created_at: Date;
}
