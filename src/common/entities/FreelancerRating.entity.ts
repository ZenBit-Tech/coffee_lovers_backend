import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from '@entities/User.entity';

@Entity()
export class FreelancerRating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null, nullable: true })
  freelancer_rating: number;

  @Column({ default: null, nullable: true })
  rating_comment: string;

  @Column({ default: null, nullable: true })
  job_id: number;

  @ManyToOne(() => User, (user) => user.freelancerRating)
  freelancer: User;

  @ManyToOne(() => User, (user) => user.freelancerRating)
  job_owner: User;
}
