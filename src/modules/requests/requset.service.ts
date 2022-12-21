import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobsService } from 'src/modules/jobs/job.service';
import { User } from '@entities/User.entity';
import { Request } from '@entities/Request.entity';
import { Offer } from '@entities/Offer.entity';
import { RequestType } from '@constants/entities';
import { UserService } from '@/modules/user/user.service';
import UserDto from '@/modules/user/dto/user.dto';
import OfferBody from './dto/offer-body-dto copy';
import ReqBody from './dto/request-body-dto';

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
  ) {}

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
}
