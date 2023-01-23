import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { User } from '@entities/User.entity';
import { ratingMessageMaxLength } from '@constants/entities';

@Entity()
export class JobOwnerRating {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @Column({ default: null, nullable: true })
  rating: number;

  @Column({
    default: null,
    nullable: true,
    type: 'varchar',
    length: ratingMessageMaxLength,
  })
  rating_comment: string;

  @Column({ default: null, nullable: true })
  job_id: number;

  @ManyToOne(() => User, (user) => user.jobOwnerRating)
  freelancer: User;

  @ManyToOne(() => User, (user) => user.jobOwnerRating)
  job_owner: User;
}
