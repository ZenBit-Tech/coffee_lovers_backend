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
import { Conversation } from '@entities/Conversation.entity';
import { Message } from '@entities/Message.entity';
import { Request } from '@entities/Request.entity';
import { Education } from '@entities/Education.entity';
import { Job } from '@entities/Job.entity';
import { Skill } from '@entities/Skill.entity';
import { WorkHistory } from '@entities/WorkHistory.entity';
import { Notification } from '@entities/Notification.entity';
import { Offer } from '@entities/Offer.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ default: null, nullable: true, select: false })
  password: string;

  @Column({ default: null, nullable: true })
  first_name: string;

  @Column({ default: null, nullable: true })
  last_name: string;

  @Column({ default: null, nullable: true })
  profile_image: string;

  @Column({ default: false, nullable: true, select: false })
  is_google: boolean;

  @Column({ default: null, nullable: true, select: false })
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

  @OneToMany(() => Conversation, (conversation) => conversation.freelancer)
  @OneToMany(() => Conversation, (conversation) => conversation.job_owner)
  conversations: Conversation[];

  @OneToMany(() => Message, (message) => message.from)
  messages: Message[];

  @OneToMany(() => Request, (request) => request.job_owner)
  @OneToMany(() => Request, (request) => request.freelancer)
  requests: Request[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @OneToMany(() => Offer, (offer) => offer.job_owner)
  @OneToMany(() => Offer, (offer) => offer.freelancer)
  offers: Offer[];
}
