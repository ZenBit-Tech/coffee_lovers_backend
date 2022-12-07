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
import { AvailableTime, EnglishLevel } from '@constants/entities';
import { User } from '@entities/User.entity';
import { Category } from '@entities/Category.entity';
import { Skill } from '@entities/Skill.entity';
import { Conversation } from '@entities/Conversation.entity';
import { Request } from '@entities/Request.entity';
import { Offer } from '@entities/Offer.entity';

@Entity()
export class Job {
  leftJoinAndSelect(arg0: string, join: string) {
    throw new Error('Method not implemented.');
  }

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

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.jobs)
  owner: User;

  @ManyToOne(() => Category, (category) => category.jobs)
  category: Category;

  @ManyToMany(() => Skill)
  @JoinTable()
  skills: Skill[];

  @OneToMany(() => Conversation, (conversation) => conversation.job)
  conversations: Conversation[];

  @OneToMany(() => Request, (request) => request.job)
  requests: Request[];

  @OneToMany(() => Offer, (offer) => offer.job)
  offers: Offer[];
}
