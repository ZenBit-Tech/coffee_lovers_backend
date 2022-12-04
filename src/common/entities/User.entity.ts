import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { Category } from '@entities/Category.entity';

import { AvailableTime, EnglishLevel, Role } from '@constants/entities';
import { Proposal } from '@entities/Proposal.entity';
import { Education } from './Education.entity';
import { Job } from './Job.entity';
import { Skill } from './Skill.entity';
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

  @Column({
    type: 'enum',
    enum: AvailableTime,
    nullable: true,
    default: null,
  })
  available_time: AvailableTime;

  @Column({ default: null, nullable: true })
  description: string;

  @Column({ default: null, nullable: true })
  hourly_rate: number;

  @Column({ default: null, nullable: true })
  position: string;

  @Column({ default: null, nullable: true })
  other_experience: string;

  @Column({
    type: 'enum',
    enum: EnglishLevel,
    nullable: true,
    default: null,
  })
  english_level: EnglishLevel;

  @Column({
    type: 'enum',
    enum: Role,
    nullable: true,
    default: null,
  })
  role: Role;

  @OneToMany(() => WorkHistory, (history) => history.user)
  workHistory: WorkHistory[];

  @OneToMany(() => Education, (education) => education.user)
  educations: Education[];

  @OneToMany(() => Job, (job) => job.owner)
  jobs: Job[];

  @ManyToMany(() => Skill)
  @JoinTable()
  skills: Skill[];

  @ManyToOne(() => Category, (category) => category.user)
  category: Category;

  @OneToMany(() => Proposal, (proposal) => proposal.user)
  proposals: Proposal[];
}
