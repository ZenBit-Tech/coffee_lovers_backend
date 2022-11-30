import {
  Injectable,
  HttpException,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common';
import { Brackets, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from '@entities/Job.entity';
import { Proposal } from '@entities/Proposal.entity';
import { findJobsDefaultLimit, findJobsDefaultOffset } from '@constants/jobs';
import UserDto from '@/modules/user/dto/user.dto';
import GetJobsDto from './dto/get-jobs.dto';
import CreateJobDto from './dto/create-job.dto';
import FindJobsResponse from './dto/find-jobs-response.dto';
import CreateProposalDto from './dto/create-proposal.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
    @InjectRepository(Proposal)
    private proposalRepository: Repository<Proposal>,
  ) {}

  async findOne(payload: object): Promise<Job | null> {
    try {
      const data = await this.jobRepository
        .createQueryBuilder('job')
        .leftJoinAndSelect('job.owner', 'user')
        .where(payload)
        .getOne();

      return data;
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

  async createProposal(
    payload: CreateProposalDto,
    user: UserDto,
  ): Promise<void> {
    try {
      const { job, ...proposalPayload } = payload;

      const proposalCount = await this.proposalRepository
        .createQueryBuilder('proposal')
        .where({ job: { id: job }, user })
        .getCount();

      if (proposalCount) {
        throw new ForbiddenException();
      }

      await this.proposalRepository
        .createQueryBuilder()
        .insert()
        .into(Proposal)
        .values([
          {
            ...proposalPayload,
            user,
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

  async getJobProposals(jobId: number, user: UserDto): Promise<Proposal[]> {
    try {
      const job = await this.findOne({ id: jobId });
      if (!(job && job.owner.id === user.id)) {
        throw new ForbiddenException();
      }

      return await this.proposalRepository
        .createQueryBuilder('proposal')
        .leftJoinAndSelect('proposal.user', 'user')
        .where({
          job: { id: jobId },
        })
        .getMany();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}
