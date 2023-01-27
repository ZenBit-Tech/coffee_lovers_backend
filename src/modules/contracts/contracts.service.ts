import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import GetFreelancerDto from 'src/modules/user/dto/get-freelancer-params.dto';
import { isUserFreelancer, isUserJobOwnerOfJob } from '@validation/jobs';
import { Favorites } from '@/common/entities/Favorites.entity';
import { User } from '@/common/entities/User.entity';
import { Contract } from '@/common/entities/Contract.entity';
import { ContractStatus, Role } from '@/common/constants/entities';
import { JobOwnerRating } from '@/common/entities/JobOwnerRating.entity';
import { FreelancerRating } from '@/common/entities/FreelancerRating.entity';
import { checkAnotherRole, checkUserRole, dateFormat } from './constants';
import GetHiresDto from './dto/get-hires.dto';
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
        .set({
          status,
          end: status === ContractStatus.CLOSED ? dateFormat() : null,
        })
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
      const closedContracts = this.contractRepository
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
        .orderBy('contracts.end', 'DESC');

      if (user.role === Role.FREELANCER) {
        closedContracts.leftJoinAndMapOne(
          'offer.isRated',
          JobOwnerRating,
          'JobOwnerRating',
          'JobOwnerRating.jobOwnerId = job_owner.id AND JobOwnerRating.freelancerId = :freelancerId AND job.id = JobOwnerRating.job_id',
          { freelancerId: user.id },
        );
      } else if (user.role === Role.JOBOWNER) {
        closedContracts.leftJoinAndMapOne(
          'offer.isRated',
          FreelancerRating,
          'FreelancerRating',
          'FreelancerRating.jobOwnerId = :jobOwnerId AND FreelancerRating.freelancerId = freelancer.id AND job.id = FreelancerRating.job_id',
          { jobOwnerId: user.id },
        );
      }

      return await closedContracts.getMany();
    } catch (error) {
      throw new HttpException(
        'Internal error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async closeContract(user: User, contractId: number): Promise<void> {
    try {
      const contract = await this.findOne({ id: contractId });

      if (user.role === Role.FREELANCER) {
        isUserFreelancer(contract.offer, user);
      } else {
        isUserJobOwnerOfJob(
          { ...contract.offer.job, owner: contract.offer.job_owner },
          user,
        );
      }
      await this.setContractStatus(contractId, ContractStatus.CLOSED);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getAllHiredFreelancers(
    user: User,
    params: GetFreelancerDto,
  ): Promise<GetHiresDto> {
    try {
      const [allHiredFreelancers, totalCount] = await this.contractRepository
        .createQueryBuilder('contracts')
        .leftJoinAndSelect('contracts.offer', 'offer')
        .leftJoinAndSelect('offer.job', 'job')
        .leftJoinAndSelect('offer.freelancer', 'freelancer')
        .where(`offer.${checkUserRole(user)}.id = :id`, { id: user.id })
        .leftJoinAndMapOne(
          'freelancer.isFavorite',
          Favorites,
          'favorites',
          'favorites.jobOwnerId = :jobOwnerId AND favorites.freelancerId = freelancer.id',
          { jobOwnerId: user.id },
        )
        .skip((params.page - 1) * params.take)
        .take(params.take)
        .getManyAndCount();

      return { allHiredFreelancers, totalCount };
    } catch (error) {
      throw new HttpException(
        'Internal error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
