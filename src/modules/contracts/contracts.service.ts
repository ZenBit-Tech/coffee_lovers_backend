import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/common/entities/User.entity';
import { Contract } from '@/common/entities/Contract.entity';
import { ContractStatus } from '@/common/constants/entities';
import { checkAnotherRole, checkUserRole } from './constants';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(Contract)
    private contractRepository: Repository<Contract>,
  ) {}

  async getActiveContracts(user: User): Promise<Contract[]> {
    try {
      const activeContracts = await this.contractRepository
        .createQueryBuilder('contracts')
        .leftJoinAndSelect('contracts.offer', 'offer')
        .leftJoinAndSelect('offer.job', 'job')
        .leftJoinAndSelect(
          `offer.${checkAnotherRole(user)}`,
          `${checkAnotherRole(user)}`,
        )
        .where(`offer.${checkUserRole(user)}.id = :id`, { id: user.id })
        .andWhere('contracts.status = :status', {
          status: ContractStatus.ACTIVE,
        })
        .orderBy('offer.start', 'DESC')
        .getMany();

      return activeContracts;
    } catch (error) {
      throw new HttpException(
        'Internal error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getClosedContracts(user: User): Promise<Contract[]> {
    try {
      const closedContracts = await this.contractRepository
        .createQueryBuilder('contracts')
        .leftJoinAndSelect('contracts.offer', 'offer')
        .leftJoinAndSelect('offer.job', 'job')
        .leftJoinAndSelect(
          `offer.${checkAnotherRole(user)}`,
          `${checkAnotherRole(user)}`,
        )
        .where(`offer.${checkUserRole(user)}.id = :id`, { id: user.id })
        .andWhere('contracts.status = :status', {
          status: ContractStatus.CLOSED,
        })
        .orderBy('contracts.end', 'DESC')
        .getMany();

      return closedContracts;
    } catch (error) {
      throw new HttpException(
        'Internal error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllHiredFreelancers(user: User): Promise<Contract[]> {
    try {
      const allHiredFreelancers = await this.contractRepository
        .createQueryBuilder('contracts')
        .leftJoinAndSelect('contracts.offer', 'offer')
        .leftJoinAndSelect('offer.job', 'job')
        .leftJoinAndSelect('offer.freelancer', 'freelancer')
        .where(`offer.${checkUserRole(user)}.id = :id`, { id: user.id })
        .orderBy('contracts.end', 'DESC')
        .getMany();

      return allHiredFreelancers;
    } catch (error) {
      throw new HttpException(
        'Internal error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
