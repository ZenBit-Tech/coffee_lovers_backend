import {
  Injectable,
  HttpException,
  InternalServerErrorException,
  Inject,
} from '@nestjs/common';
import { Brackets, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from '@entities/Job.entity';
import { findJobsDefaultLimit, findJobsDefaultOffset } from '@constants/jobs';
import UserDto from '@/modules/user/dto/user.dto';
import { UserService } from '@/modules/user/user.service';
import { PropertiesService } from '@/modules/properties/properties.service';
import GetJobsDto from './dto/get-jobs.dto';
import CreateJobDto from './dto/create-job.dto';
import FindJobsResponse from './dto/find-jobs-response.dto';

@Injectable()
export class JobsService {
  constructor(
    @Inject(UserService)
    private userService: UserService,

    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
    private propertiesService: PropertiesService,
  ) {}

  async getAllJobs(): Promise<Job[]> {
    try {
      return await this.jobRepository.createQueryBuilder().getMany();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
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
      const owner = await this.userService.findByEmail(user.email);
      const { category, skills, ...data } = payload;
      const insertResult = await this.jobRepository
        .createQueryBuilder()
        .insert()
        .into(Job)
        .values([
          {
            ...data,
            owner,
            ...(category && {
              category: await this.propertiesService.findCategoryById(category),
            }),
          },
        ])
        .execute();

      if (skills) {
        const { id } = insertResult.identifiers.at(0);
        await this.jobRepository
          .createQueryBuilder()
          .relation(Job, 'skills')
          .of(id)
          .add(skills);
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}
