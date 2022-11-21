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
import { EnglishLevel } from '@constants/entities';

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

  @Column({
    type: 'enum',
    enum: EnglishLevel,
    nullable: true,
    default: null,
  })
  english_level: EnglishLevel;

  @ManyToOne(() => User, (user) => user.jobs)
  owner: User;

  @ManyToOne(() => Category, (category) => category.jobs)
  category: Category;

  @ManyToMany(() => Skill)
  @JoinTable()
  skills: Skill[];
}
