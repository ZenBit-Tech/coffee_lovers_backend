import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '@entities/User.entity';

@Entity()
export class WorkHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null, nullable: true })
  work_history_descr: string;

  @Column({ default: null, nullable: true })
  work_history_from: string;

  @Column({ default: null, nullable: true })
  work_history_to: string;

  @ManyToOne(() => User, (user) => user.workHistory)
  user: User;
}
