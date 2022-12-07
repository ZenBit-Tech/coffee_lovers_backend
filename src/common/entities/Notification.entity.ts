import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '@entities/User.entity';
import { NotificationType } from '@constants/entities';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.notifications)
  user: User;

  @Column({ default: null, nullable: true })
  message: string;

  @Column({ default: null, nullable: true })
  link: string;

  @Column({
    type: 'enum',
    enum: NotificationType,
    nullable: true,
    default: null,
  })
  type: NotificationType;
}
