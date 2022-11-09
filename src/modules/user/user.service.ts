import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult } from 'typeorm';
import { User } from '@entities/User.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import CreateUserDto from '@/modules/user/dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  async create(dto: CreateUserDto): Promise<InsertResult> {
    try {
      const user = { ...dto };
      if (user.password) {
        const hashedPassword = await bcrypt.hash(
          dto.password,
          +this.configService.get('BCRYPT_SALT_ROUNDS'),
        );
        user.password = hashedPassword;
      }
      const data = await this.userRepository
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([user])
        .execute();

      return data;
    } catch (error) {
      throw new HttpException(
        'Internal error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const data = await this.userRepository
        .createQueryBuilder()
        .select('id')
        .from(User, 'id')
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
