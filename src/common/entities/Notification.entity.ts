import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from '@entities/User.entity';
import { Job } from '@entities/Job.entity';
import { NotificationType } from '@/modules/notifications/types';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.notifications)
  to: User;

  @ManyToOne(() => User, (user) => user.notifications)
  user: User;

  @ManyToOne(() => Job, (job) => job.notifications)
  job: Job;

  @Column({ default: null, nullable: true })
  message: string;

  @Column({
    type: 'enum',
    enum: NotificationType,
    nullable: true,
    default: null,
  })
  type: NotificationType;

  @Column({ default: false, nullable: true })
  is_read: boolean;

  @CreateDateColumn()
  created_at: Date;
}
