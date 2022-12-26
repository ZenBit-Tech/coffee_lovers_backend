import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/common/entities/User.entity';
import { Contract } from '@/common/entities/Contract.entity';
import { ContractStatus, Role } from '@/common/constants/entities';
import { checkAnotherRole, checkUserRole } from './constants';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(Contract)
    private contractRepository: Repository<Contract>,
  ) {}

  async findContractsByOffersId(offers: number[]): Promise<Contract[]> {
    try {
      return await this.contractRepository
        .createQueryBuilder('contract')
        .leftJoinAndSelect('contract.offer', 'offer')
        .leftJoinAndSelect('offer.freelancer', 'user')
        .where('contract.offer.id IN (:...offers)', { offers })
        .getMany();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

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
}
