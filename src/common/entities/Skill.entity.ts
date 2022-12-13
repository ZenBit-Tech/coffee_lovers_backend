import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  name: string;
}
