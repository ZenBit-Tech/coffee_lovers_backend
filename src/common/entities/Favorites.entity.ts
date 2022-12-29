import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '@entities/User.entity';

@Entity()
export class Favorites {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.favorites)
  freelancer: User;

  @ManyToOne(() => User, (user) => user.favorites)
  job_owner: User;
}
