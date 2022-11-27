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
import JobIdDto from './dto/user-id.dto';
import { EnglishLevel } from '@/common/constants/entities';

@Injectable()
export class JobsService {
  constructor(
    @Inject(UserService)
    private userService: UserService,

    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
  ) {}

  async getAllJobs(
    available_time: number,
    hourly_rate: number,
    english_level: EnglishLevel,
    limit: number,
    skip: number,
  ): Promise<Job[]> {
    try {
      const data = { available_time, hourly_rate, english_level };
      const [res] = await this.jobRepository
        .findAndCount({
          where: data,
          take: limit,
          skip,
        })
        .then((json) => json);

      return res;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async getOneJob(id: JobIdDto): Promise<AddJobDescriptionDto> {
    try {
      const data = parseInt(id.id, 10);

      return await this.jobRepository
        .findOneBy({ id: data })
        .then((job) => job);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
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
