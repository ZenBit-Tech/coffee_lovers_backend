import {
  Injectable,
  Body,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@entities/User.entity';
import { Job } from '@entities/Job.entity';
import AddJobDescriptionDto from './dto/add-user-job.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
  ) {}

  async getAllJobs() {
    try {
      const data = await this.userRepository.createQueryBuilder().getMany();

      return data;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async addJobToUser(user: User, payload: AddJobDescriptionDto): Promise<void> {
    try {
      await this.jobRepository
        .createQueryBuilder()
        .insert()
        .into(Job)
        .values([{ ...payload }])
        .execute();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}
