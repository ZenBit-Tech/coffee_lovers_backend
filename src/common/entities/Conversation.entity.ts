import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Job } from '@entities/Job.entity';
import { User } from '@entities/User.entity';
import { Message } from '@entities/Message.entity';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Job, (job) => job.conversations)
  job: Job;

  @ManyToOne(() => User, (user) => user.conversations)
  freelancer: User;

  @ManyToOne(() => User, (user) => user.conversations)
  job_owner: User;

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];
}
