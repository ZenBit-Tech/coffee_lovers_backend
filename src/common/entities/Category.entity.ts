import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Job } from '@entities/Job.entity';
import { User } from './User.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  name: string;

  @OneToMany(() => Job, (job) => job.category)
  jobs: Job[];

  @OneToMany(() => User, (user) => user.category)
  user: User[];
}
