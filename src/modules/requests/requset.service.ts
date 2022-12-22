import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobsService } from 'src/modules/jobs/job.service';
import { User } from '@/common/entities/User.entity';
import { Request } from '@/common/entities/Request.entity';
import { UserService } from '@/modules/user/user.service';
import { Offer } from '@/common/entities/Offer.entity';
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
      const checkRequest = await this.requestRepository
        .createQueryBuilder('request')
        .leftJoin('request.job_owner', 'job_owner')
        .leftJoin('request.freelancer', 'freelancer')
        .leftJoin('request.job', 'job')
        .where('job_owner.id = :ownerId', { ownerId: user.id })
        .andWhere('freelancer.id = :frId', { frId: fr })
        .andWhere('job.id = :jobId', { jobId: job_id })
        .getOne();

      if (checkRequest) {
        throw new HttpException(
          'You have already sent request about this job',
          HttpStatus.BAD_REQUEST,
        );
      }

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
      const checkOffer = await this.offerRepository
        .createQueryBuilder('offer')
        .leftJoin('offer.job_owner', 'job_owner')
        .leftJoin('offer.freelancer', 'freelancer')
        .leftJoin('offer.job', 'job')
        .where('job_owner.id = :ownerId', { ownerId: user.id })
        .andWhere('freelancer.id = :frId', { frId: fr })
        .andWhere('job.id = :jobId', { jobId })
        .getOne();

      if (checkOffer) {
        throw new HttpException(
          'You have already sent offer about this job',
          HttpStatus.BAD_REQUEST,
        );
      }

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
}
