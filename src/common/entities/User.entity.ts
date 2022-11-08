import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RefreshToken } from '@entities/RefreshToken.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ default: '' })
  password: string;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ default: '' })
  profile_image: string;

  @Column({ default: false })
  is_google: boolean;

  @OneToMany(() => RefreshToken, (token) => token.user_id)
  tokens: RefreshToken[];
}
