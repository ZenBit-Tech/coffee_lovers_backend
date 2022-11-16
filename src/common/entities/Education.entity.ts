import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '@entities/User.entity';

@Entity()
export class Education {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null, nullable: true })
  education_descr: string;

  @Column({ default: null, nullable: true })
  education_from: string;

  @Column({ default: null, nullable: true })
  education_to: string;

  @ManyToOne(() => User, (user) => user.educations)
  user: User;
}
