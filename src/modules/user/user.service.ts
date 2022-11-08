import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult } from 'typeorm';
import { User } from '@entities/User.entity';
import CreateUserDto from '@/modules/user/dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<InsertResult> {
    try {
      const data = await this.userRepository
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([dto])
        .execute();
      return data;
    } catch (error) {
      throw new HttpException(
        'Internal error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const data = await this.userRepository
        .createQueryBuilder()
        .select('id, email, first_name, last_name, profile_image, is_google')
        .from(
          User,
          'id, email, first_name, last_name, profile_image, is_google',
        )
        .where({ email })
        .getOne();
      return data;
    } catch (error) {
      throw new HttpException(
        'Internal error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
