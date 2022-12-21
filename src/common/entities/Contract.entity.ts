import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Offer } from '@entities/Offer.entity';
import { ContractStatus } from '@constants/entities';

@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Offer)
  @JoinColumn()
  offer: Offer;

  @CreateDateColumn()
  created_at: Date;

  @Column({
    type: 'enum',
    enum: ContractStatus,
    nullable: true,
    default: null,
  })
  status: ContractStatus;

  @Column()
  end: Date;
}
