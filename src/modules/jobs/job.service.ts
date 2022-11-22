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
import { ConfigService } from '@nestjs/config';
import AddJobDescriptionDto from './dto/add-user-job.dto';
import UserDto from '../user/dto/user.dto';
import { MailService } from '../mail/mail.service';
import { UserService } from '../user/user.service';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userService: UserService,

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
