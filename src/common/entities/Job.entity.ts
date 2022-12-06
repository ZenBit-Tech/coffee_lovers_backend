import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@entities/User.entity';
import { Category } from '@entities/Category.entity';
import { Skill } from '@entities/Skill.entity';
import { Proposal } from '@entities/Proposal.entity';
import {
  AvailableTime,
  EnglishLevel,
  DurationAmount,
} from '@constants/entities';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null, nullable: true })
  title: string;

  @Column({ default: null, nullable: true })
  description: string;

  @Column({ default: null, nullable: true })
  hourly_rate: number;

  @Column({
    type: 'enum',
    enum: AvailableTime,
    nullable: true,
    default: null,
  })
  available_time: AvailableTime;

  @Column({
    type: 'enum',
    enum: EnglishLevel,
    nullable: true,
    default: null,
  })
  english_level: EnglishLevel;

  @Column({ default: null, nullable: true })
  duration: number;

  @Column({
    type: 'enum',
    enum: DurationAmount,
    nullable: true,
    default: null,
  })
  duration_amount: DurationAmount;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.jobs)
  owner: User;

  @ManyToOne(() => Category, (category) => category.jobs)
  category: Category;

  @ManyToMany(() => Skill)
  @JoinTable()
  skills: Skill[];

  @OneToMany(() => Proposal, (proposal) => proposal.job)
  proposals: Proposal[];
}
