import {
  Injectable,
  HttpException,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common';
import { Brackets, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from '@entities/Job.entity';
import { findJobsDefaultLimit, findJobsDefaultOffset } from '@constants/jobs';
import { Request } from '@entities/Request.entity';
import { JobStatus, RequestType } from '@constants/entities';
import { User } from '@entities/User.entity';
import { isUserJobOwnerOfJob } from '@validation/jobs';
import { Conversation } from '@/common/entities/Conversation.entity';
import UserDto from '@/modules/user/dto/user.dto';
import { Offer } from '@/common/entities/Offer.entity';
import GetJobsDto from './dto/get-jobs.dto';
import CreateJobDto from './dto/create-job.dto';
import UpdateJobDto from './dto/update-job.dto';
import FindJobsResponse from './dto/find-jobs-response.dto';
import CreateProposalDto from './dto/create-proposal.dto';
import getJobProposalsResponseDto from './dto/get-job-proposals-response.dto';
import getJobByIdResponseDto from './dto/get-job-response.dto';
import SetStatusDto from './dto/set-status.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    @InjectRepository(Request)
    private requestRepository: Repository<Request>,
  ) {}

  async findOne(payload: object, leftJoins?: string[]): Promise<Job | null> {
    try {
      const query = this.jobRepository
        .createQueryBuilder('job')
        .leftJoinAndSelect('job.owner', 'user')
        .where(payload);

      if (leftJoins) {
        leftJoins.forEach((join) => {
          query.leftJoinAndSelect(`job.${join}`, join);
        });
      }

      return await query.getOne();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findJobs(params: GetJobsDto): Promise<FindJobsResponse> {
    try {
      const {
        limit,
        offset,
        skills,
        categories,
        hourly_rate_start,
        hourly_rate_end,
        search,
        ...jobPayload
      } = params;

      const query = this.jobRepository
        .createQueryBuilder('job')
        .leftJoinAndSelect('job.owner', 'user')
        .leftJoinAndSelect('job.category', 'category')
        .where(jobPayload)
        .andWhere('job.status != :finishedStatus', {
          finishedStatus: JobStatus.FINISHED,
        })
        .limit(params.limit || findJobsDefaultLimit)
        .offset(params.offset || findJobsDefaultOffset)
        .orderBy('job.created_at', 'DESC');

      if (hourly_rate_start) {
        query.andWhere('job.hourly_rate >= :hourly_rate_start', {
          hourly_rate_start,
        });
      }

      if (hourly_rate_end) {
        query.andWhere('job.hourly_rate <= :hourly_rate_end', {
          hourly_rate_end,
        });
      }

      if (search) {
        query.andWhere(
          new Brackets((qb) => {
            qb.where('job.title LIKE :search').orWhere(
              'job.description LIKE :search',
              {
                search: `%${search}%`,
              },
            );
          }),
        );
      }

      if (categories) {
        query.andWhere('job.category.id IN (:...categories)', { categories });
      }

      if (skills) {
        query.innerJoin('job.skills', 'skill', 'skill.id IN (:...skills)', {
          skills,
        });
      }

      const [jobs, totalCount] = await query.getManyAndCount();

      return {
        jobs,
        meta: {
          totalCount,
        },
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async createJob(payload: CreateJobDto, user: UserDto): Promise<void> {
    try {
      const { category, skills, ...data } = payload;
      const insertResult = await this.jobRepository
        .createQueryBuilder()
        .insert()
        .into(Job)
        .values([
          {
            ...data,
            owner: user,
            ...(category && {
              category: { id: category },
            }),
          },
        ])
        .execute();

      if (skills) {
        const { id } = insertResult.identifiers.shift();
        if (id) {
          await this.jobRepository
            .createQueryBuilder()
            .relation(Job, 'skills')
            .of(id)
            .add(skills);
        }
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async getPostedJobs(user: UserDto): Promise<Job[]> {
    try {
      return await this.jobRepository
        .createQueryBuilder('job')
        .leftJoinAndSelect('job.category', 'category')
        .loadRelationCountAndMap(
          'job.proposalsCount',
          'job.requests',
          'proposalsCount',
          (qb) =>
            qb.andWhere('proposalsCount.type = :type', {
              type: RequestType.PROPOSAL,
            }),
        )
        .where({ owner: user })
        .getMany();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async createProposal(
    payload: CreateProposalDto,
    user: UserDto,
  ): Promise<void> {
    try {
      const { job, ...proposalPayload } = payload;

      const proposalCount = await this.requestRepository
        .createQueryBuilder('request')
        .where({ job: { id: job }, freelancer: user })
        .getCount();

      if (proposalCount) {
        throw new ForbiddenException();
      }

      await this.requestRepository
        .createQueryBuilder()
        .insert()
        .into(Request)
        .values([
          {
            ...proposalPayload,
            type: RequestType.PROPOSAL,
            freelancer: { id: user.id },
            job: { id: job },
          },
        ])
        .execute();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async getJobProposals(
    jobId: number,
    user: UserDto,
  ): Promise<getJobProposalsResponseDto> {
    try {
      const job = await this.findOne({ id: jobId });
      isUserJobOwnerOfJob(job, user as User);

      const proposals = await this.requestRepository
        .createQueryBuilder('request')
        .leftJoinAndSelect('request.freelancer', 'freelancer')
        .leftJoinAndSelect('freelancer.skills', 'skill')
        .where({
          job: { id: jobId },
          type: RequestType.PROPOSAL,
          rejected: false,
        })
        .getMany();

      return {
        job,
        proposals: proposals.map((item) => ({
          id: item.id,
          user: item.freelancer,
          cover_letter: item.cover_letter,
          hourly_rate: item.hourly_rate,
        })),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async getJobById(jobId: number): Promise<getJobByIdResponseDto | null> {
    try {
      const job = await this.findOne({ id: jobId }, ['category']);

      return {
        job,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async getAllUserJobs(user: UserDto, fr: number): Promise<Job[]> {
    try {
      const jobsResponse = await this.jobRepository
        .createQueryBuilder('job')
        .where({ owner: user })
        .getMany();

      return jobsResponse;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async updateJob(payload: UpdateJobDto, user: UserDto): Promise<void> {
    try {
      const { id, skills, ...jobPayload } = payload;
      const job = await this.findOne({ id });
      isUserJobOwnerOfJob(job, user as User);

      if (skills) {
        const jobWithSkills = await this.jobRepository
          .createQueryBuilder('job')
          .leftJoinAndSelect('job.skills', 'skills')
          .where('job.id = :id', { id })
          .getOne();
        await this.jobRepository
          .createQueryBuilder()
          .relation(Job, 'skills')
          .of(id)
          .addAndRemove(skills, jobWithSkills.skills);
      }
      await this.jobRepository
        .createQueryBuilder()
        .update(Job)
        .set({
          ...jobPayload,
        })
        .where('id = :id', { id })
        .execute();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async setJobStatus(user: UserDto, payload: SetStatusDto): Promise<void> {
    try {
      const job = await this.findOne({ id: payload.jobId });
      isUserJobOwnerOfJob(job, user as User);

      await this.jobRepository
        .createQueryBuilder()
        .update(Job)
        .set({ status: payload.status })
        .where('id = :id', { id: payload.jobId })
        .execute();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}
