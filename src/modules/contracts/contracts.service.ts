import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@entities/User.entity';
import { Contract } from '@entities/Contract.entity';
import { ContractStatus } from '@constants/entities';
import { isUserJobOwnerOfJob } from '@validation/jobs';
import { Job } from '@entities/Job.entity';
import UserDto from '@/modules/user/dto/user.dto';
import { checkAnotherRole, checkUserRole } from './constants';
import FindOneContractDto from './dto/find-one-contract.dto';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(Contract)
    private contractRepository: Repository<Contract>,
  ) {}

  async findOne(payload: FindOneContractDto): Promise<Contract | null> {
    try {
      return await this.contractRepository
        .createQueryBuilder('contract')
        .leftJoinAndSelect('contract.offer', 'offer')
        .leftJoinAndSelect('offer.job', 'job')
        .leftJoinAndSelect('offer.job_owner', 'job_owner')
        .leftJoinAndSelect('offer.freelancer', 'freelancer')
        .where(payload)
        .getOne();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async setContractStatus(
    contractId: number,
    status: ContractStatus,
  ): Promise<void> {
    try {
      await this.contractRepository
        .createQueryBuilder()
        .update(Contract)
        .set({ status })
        .where('id = :id', { id: contractId })
        .execute();
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

  async closeContract(user: UserDto, contractId: number): Promise<void> {
    try {
      const contract = await this.findOne({ id: contractId });
      isUserJobOwnerOfJob(
        { owner: contract.offer.job_owner } as Job,
        user as User,
      );

      await this.setContractStatus(contractId, ContractStatus.CLOSED);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
