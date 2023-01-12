import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import GetFreelancerDto from 'src/modules/user/dto/get-freelancer-params.dto';
import { User } from '@/common/entities/User.entity';
import { Contract } from '@/common/entities/Contract.entity';
import { ContractStatus } from '@/common/constants/entities';
import { checkAnotherRole, checkUserRole } from './constants';
import GetHiresDto from './dto/get-hires.dto';
import { Favorites } from '@/common/entities/Favorites.entity';

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
