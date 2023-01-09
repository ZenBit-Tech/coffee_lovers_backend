import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobsService } from 'src/modules/jobs/job.service';
import { User } from '@entities/User.entity';
import { Request } from '@entities/Request.entity';
import { Contract } from '@entities/Contract.entity';
import { Offer } from '@entities/Offer.entity';
import {
  ContractStatus,
  JobStatus,
  OfferStatus,
  RequestType,
} from '@constants/entities';
import { isOfferPendingForUser } from '@validation/offers';
import { isRequestForFreelancer } from '@validation/requests';
import { UserService } from '@/modules/user/user.service';
import UserDto from '@/modules/user/dto/user.dto';
import OfferBody from './dto/offer-body-dto copy';
import ReqBody from './dto/request-body-dto';
import FindRequestDto from './dto/find-request.dto';
import FindOfferDto from './dto/find-offer.dto';

@Injectable()
export class RequsetService {
  constructor(
    @Inject(JobsService)
    private jobsService: JobsService,

    @Inject(UserService)
    private userService: UserService,

    @InjectRepository(Request)
    private requestRepository: Repository<Request>,

    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,

    @InjectRepository(Contract)
    private contractRepository: Repository<Contract>,
  ) {}

  async findRequest(payload: FindRequestDto): Promise<Request> {
    try {
      return await this.requestRepository
        .createQueryBuilder('request')
        .where(payload)
        .leftJoinAndSelect('request.freelancer', 'freelancer')
        .getOne();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOffer(payload: FindOfferDto): Promise<Offer> {
    try {
      return await this.offerRepository
        .createQueryBuilder('offer')
        .where(payload)
        .leftJoinAndSelect('offer.freelancer', 'freelancer')
        .leftJoinAndSelect('offer.job', 'job')
        .getOne();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async addRequest(
    user: User,
    body: ReqBody,
    fr: number,
    job_id: number,
  ): Promise<void> {
    try {
      const { job } = await this.jobsService.getJobById(job_id);
      const freelancer = await this.userService.getUserById(fr);
      this.requestRepository
        .createQueryBuilder('request')
        .leftJoin('request.job', 'job')
        .insert()
        .into(Request)
        .values({ ...body, freelancer, job, job_owner: user })
        .execute();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async addOffer(
    user: User,
    jobId: number,
    fr: number,
    body: OfferBody,
  ): Promise<void> {
    try {
      const { job } = await this.jobsService.getJobById(jobId);
      const freelancer = await this.userService.getUserById(fr);
      this.offerRepository
        .createQueryBuilder('offer')
        .leftJoin('offer.job', 'job')
        .insert()
        .into(Offer)
        .values({ ...body, freelancer, job, job_owner: user })
        .execute();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getOffersByUser(user: UserDto): Promise<Offer[]> {
    try {
      return await this.offerRepository
        .createQueryBuilder('offer')
        .leftJoinAndSelect('offer.job', 'job')
        .leftJoinAndSelect('job.category', 'category')
        .leftJoinAndSelect('offer.job_owner', 'job_owner')
        .where({ freelancer: user })
        .getMany();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async acceptOffer(user: UserDto, id: number): Promise<void> {
    try {
      const offer = await this.findOffer({ id });
      isOfferPendingForUser(user, offer);
      await this.requestRepository
        .createQueryBuilder()
        .update(Offer)
        .set({ status: OfferStatus.ACCEPTED })
        .where({ id })
        .execute();

      await this.contractRepository
        .createQueryBuilder()
        .insert()
        .into(Contract)
        .values([{ offer, status: ContractStatus.ACTIVE }])
        .execute();

      if (offer.job.status === JobStatus.PENDING) {
        await this.jobsService.setJobStatus(
          offer.job.id,
          JobStatus.IN_PROGRESS,
        );
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async declineOffer(user: UserDto, id: number): Promise<void> {
    try {
      const offer = await this.findOffer({ id });
      isOfferPendingForUser(user, offer);
      await this.requestRepository
        .createQueryBuilder()
        .update(Offer)
        .set({ status: OfferStatus.DECLINED })
        .where({ id })
        .execute();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async getInterviewsByUser(user: UserDto): Promise<Request[]> {
    try {
      return await this.requestRepository
        .createQueryBuilder('request')
        .leftJoinAndSelect('request.job', 'job')
        .leftJoinAndSelect('job.category', 'category')
        .leftJoinAndSelect('request.job_owner', 'job_owner')
        .where({
          freelancer: user,
          type: RequestType.INTERVIEW,
          rejected: false,
        })
        .getMany();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteInterview(user: UserDto, id: number): Promise<void> {
    try {
      const request = await this.findRequest({ id });
      isRequestForFreelancer(user, request);

      await this.requestRepository
        .createQueryBuilder()
        .update(Request)
        .set({ rejected: true })
        .where({ id })
        .execute();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}
