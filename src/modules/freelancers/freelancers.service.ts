import {
  Injectable,
  HttpException,
  InternalServerErrorException,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@entities/User.entity';
import { Job } from '@entities/Job.entity';
import AddJobDescriptionDto from './dto/add-user-job.dto';
import UserDto from '@/modules/user/dto/user.dto';
import { UserService } from '@/modules/user/user.service';
import JobParamsDto from './dto/job-params.dto.ts';

@Injectable()
export class JobsService {
  constructor(
    @Inject(UserService)
    private userService: UserService,

    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
  ) {}

  async getAllJobs(
    data: JobParamsDto,
    limit: number,
    skip: number,
  ): Promise<Job[]> {
    const [res] = await this.jobRepository
      .findAndCount({
        where: data,
        take: limit,
        skip,
      })
      .then((json) => json);

    return res;
  }

  async getOneJob(data: number): Promise<AddJobDescriptionDto> {
    return this.jobRepository.findOneBy({ id: data }).then((job) => job);
  }

  async addJobToUser(
    owner: User,
    payload: AddJobDescriptionDto,
  ): Promise<void> {
    try {
      await this.jobRepository
        .createQueryBuilder()
        .insert()
        .into(Job)
        .values([{ ...payload, owner }])
        .execute();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async addJobInfo(
    payload: AddJobDescriptionDto,
    user: UserDto,
  ): Promise<void> {
    try {
      const currentUser = await this.userService.findByEmail(user.email);

      await this.addJobToUser(currentUser, payload);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}
