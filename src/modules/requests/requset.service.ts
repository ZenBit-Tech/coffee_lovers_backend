import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
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
import { isOfferPendingForUser } from '@/common/validation/offers';
import { isRequestForFreelancer } from '@/common/validation/requests';
import { JobsService } from '@/modules/jobs/job.service';
import { checkAnotherRole, checkUserRole } from '@/modules/contracts/constants';
import { UserService } from '@/modules/user/user.service';
import { NotificationsService } from '@/modules/notifications/notifications.service';
import { NotificationType } from '@/modules/notifications/types';
import { Job } from '@/common/entities/Job.entity';
import UserDto from '@/modules/user/dto/user.dto';
import ReqBody from './dto/request-body-dto';
import FindRequestDto from './dto/find-request.dto';
import FindOfferDto from './dto/find-offer.dto';
import OfferBody from './dto/offer-body-dto';

@Injectable()
export class RequsetService {
  constructor(
    @Inject(JobsService)
    private jobsService: JobsService,

    @Inject(UserService)
    private userService: UserService,

    @Inject(NotificationsService)
    private notificationsService: NotificationsService,

    @InjectRepository(Request)
    private requestRepository: Repository<Request>,

    @InjectRepository(Job)
    private jobRepository: Repository<Job>,

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
        .leftJoinAndSelect('offer.job_owner', 'job_owner')
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
      await this.requestRepository
        .createQueryBuilder('request')
        .leftJoin('request.job', 'job')
        .insert()
        .into(Request)
        .values({ ...body, freelancer, job, job_owner: user })
        .execute();

      if (body.type === RequestType.INTERVIEW) {
        this.notificationsService.emit(fr, {
          type: NotificationType.NEW_INTERVIEW,
          user,
          job,
        });
      }
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
      await this.offerRepository
        .createQueryBuilder('offer')
        .leftJoin('offer.job', 'job')
        .insert()
        .into(Offer)
        .values({ ...body, freelancer, job, job_owner: user })
        .execute();

      this.notificationsService.emit(fr, {
        type: NotificationType.NEW_OFFER,
        user,
        job,
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getJobsWithoutOffer(user: UserDto, fr: number): Promise<Job[]> {
    try {
      const jobsResponse = await this.jobRepository
        .createQueryBuilder('job')
        .leftJoinAndSelect('job.offers', 'offer')
        .leftJoinAndSelect('job.requests', 'request')
        .loadRelationCountAndMap('job.count', 'job.offers', 'offer', (qb) =>
          qb.where('offer.freelancer.id = :user_id', {
            user_id: fr,
          }),
        )
        .where({ owner: user })
        .andWhere(
          new Brackets((qb) => {
            qb.where(`request.freelancer.id = :fr`, { fr }).andWhere(
              `request.type != :type`,
              {
                type: RequestType.PROPOSAL,
              },
            );
          }),
        )
        .getMany();

      return jobsResponse;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async getJobsWithoutInvite(user: UserDto, fr: number): Promise<Job[]> {
    try {
      const jobsResponse = await this.jobRepository
        .createQueryBuilder('job')
        .leftJoinAndSelect('job.offers', 'offer')
        .leftJoinAndSelect('job.requests', 'request')
        .where({ owner: user })
        .loadRelationCountAndMap('job.count', 'job.requests', 'request', (qb) =>
          qb.where(
            'request.freelancer.id = :user_id AND request.type = :type',
            {
              user_id: fr,
              type: 'Interview',
            },
          ),
        )
        .loadRelationCountAndMap(
          'job.conversationCount',
          'job.conversations',
          'conversation',
          (qb) =>
            qb.where('conversation.freelancer.id = :user_id', {
              user_id: fr,
            }),
        )
        .getMany();

      return jobsResponse;
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async getOffersByUser(user: User): Promise<Offer[]> {
    try {
      return await this.offerRepository
        .createQueryBuilder('offer')
        .leftJoinAndSelect('offer.job', 'job')
        .leftJoinAndSelect('job.category', 'category')
        .leftJoinAndSelect(
          `offer.${checkAnotherRole(user)}`,
          `${checkAnotherRole(user)}`,
        )
        .where(`offer.${checkUserRole(user)}.id = :id`, { id: user.id })
        .getMany();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async acceptOffer(user: User, id: number): Promise<void> {
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

      this.notificationsService.emit(offer.job_owner.id, {
        type: NotificationType.ACCEPTED_OFFER,
        user,
        job: offer.job,
      });

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

  async declineOffer(user: User, id: number): Promise<void> {
    try {
      const offer = await this.findOffer({ id });
      isOfferPendingForUser(user, offer);
      await this.requestRepository
        .createQueryBuilder()
        .update(Offer)
        .set({ status: OfferStatus.DECLINED })
        .where({ id })
        .execute();

      this.notificationsService.emit(offer.job_owner.id, {
        type: NotificationType.DECLINED_OFFER,
        user,
        job: offer.job,
      });
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
