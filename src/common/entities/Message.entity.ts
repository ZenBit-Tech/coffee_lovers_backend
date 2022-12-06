import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Conversation } from '@entities/Conversation.entity';
import { User } from './User.entity';
import { conversationMessageMaxLength } from '../constants/entities';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  conversation: Conversation;

  @ManyToOne(() => User, (user) => user.messages)
  from: User;

  @Column({
    type: 'varchar',
    length: conversationMessageMaxLength,
    default: null,
    nullable: true,
  })
  message: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ default: false, nullable: true })
  is_read: boolean;
}
