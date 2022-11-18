import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@entities/User.entity';
import { Category } from '@entities/Category.entity';
import { Skill } from '@entities/Skill.entity';
import { EnglishLevel } from '@entities/EnglishLevel.entity';

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

  @Column({ default: null, nullable: true })
  available_time: number;

  @ManyToOne(() => User, (user) => user.jobs)
  owner: User;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];

  @ManyToMany(() => Skill)
  @JoinTable()
  skills: Skill[];

  @ManyToOne(() => EnglishLevel, (level) => level.jobs)
  english_level: EnglishLevel;
}
