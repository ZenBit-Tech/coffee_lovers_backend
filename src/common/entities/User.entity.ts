import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ default: '' })
  password: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ default: '' })
  profile_image: string;

  @Column({ default: false })
  is_google: boolean;
}
