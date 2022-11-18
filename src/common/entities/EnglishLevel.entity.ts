import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Job } from '@entities/Job.entity';

@Entity()
export class EnglishLevel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  name: string;

  @OneToMany(() => Job, (job) => job.english_level)
  jobs: Job[];
}
