import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Education } from './Education.entity';
import { Job } from './Job.entity';
import { WorkHistory } from './WorkHistory.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ default: null, nullable: true })
  password: string;

  @Column({ default: null, nullable: true })
  first_name: string;

  @Column({ default: null, nullable: true })
  last_name: string;

  @Column({ default: null, nullable: true })
  profile_image: string;

  @Column({ default: false, nullable: true })
  is_google: boolean;

  @Column({ default: null, nullable: true })
  reset_password_key: string;

  @Column({ default: null, nullable: true })
  available_time: string;

  @Column({ default: null, nullable: true })
  description: string;

  @Column({ default: null, nullable: true })
  hourly_rate: number;

  @Column({ default: null, nullable: true })
  position: string;

  @OneToMany(() => WorkHistory, (history) => history.user)
  workHistory: WorkHistory[];

  @OneToMany(() => Education, (education) => education.user)
  educations: Education[];

  @OneToMany(() => Job, (job) => job.owner)
  jobs: Job[];
}
