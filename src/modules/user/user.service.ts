import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
  HttpException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository, InsertResult, createQueryBuilder } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '@entities/User.entity';
import { Education } from '@entities/Education.entity';
import { WorkHistory } from '@entities/WorkHistory.entity';
import { MailService } from '@/modules/mail/mail.service';
import { FileService } from '@/modules/file/file.service';
import { FileType } from '@/modules/file/types';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import PasswordResetRequestDto from './dto/password-reset-request.dto';
import PasswordResetDto from './dto/password-reset.dto';
import UserDto from './dto/user.dto';
import SetProfileImageDto from './dto/set-profile-image.dto';
import AddUserWorkhistoryDto from './dto/add-user-workhistory.dto';
import AddUserEducationDto from './dto/add-user-education.dto';
import { Category } from '@/common/entities/Category.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Education)
    private educationRepository: Repository<Education>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
    private configService: ConfigService,
    private mailService: MailService,
    private fileService: FileService,

    @InjectRepository(WorkHistory)
    private workHistoryRepository: Repository<WorkHistory>,
  ) {}

  async create(dto: CreateUserDto): Promise<InsertResult> {
    try {
      const user = await this.hashPassword(dto);
      const data = await this.userRepository
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([user])
        .execute();

      return data;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async addEducationToUser(
    user: User,
    payload: AddUserEducationDto,
  ): Promise<void> {
    try {
      await this.educationRepository
        .createQueryBuilder()
        .insert()
        .into(Education)
        .values([{ ...payload, user }])
        .execute();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async addWorkToUser(
    user: User,
    payload: AddUserWorkhistoryDto,
  ): Promise<void> {
    try {
      await this.workHistoryRepository
        .createQueryBuilder()
        .insert()
        .into(WorkHistory)
        .values([{ ...payload, user }])
        .execute();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async findOne(payload: object): Promise<User | null> {
    try {
      const data = await this.userRepository
        .createQueryBuilder()
        .select('id')
        .from(User, 'id')
        .where(payload)
        .getOne();

      return data;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const data = await this.findOne({ email });

      return data;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateUserByEmail(
    email: string,
    payload: UpdateUserDto,
  ): Promise<void> {
    try {
      await this.userRepository
        .createQueryBuilder()
        .update(User)
        .set(payload)
        .where({ email })
        .execute();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async sendPasswordResetMail(dto: PasswordResetRequestDto): Promise<void> {
    try {
      const user = await this.findByEmail(dto.email);
      if (!user) {
        throw new BadRequestException('User not found');
      }
      await this.mailService.sendResetPassword(user);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async resetPassword(dto: PasswordResetDto): Promise<void> {
    try {
      const user = await this.findOne({ reset_password_key: dto.key });
      if (!user) {
        throw new BadRequestException('Invalid key');
      }
      const payload = await this.hashPassword({ password: dto.password });
      payload.reset_password_key = null;
      await this.updateUserByEmail(user.email, payload);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async setProfileImage(
    avatar: Express.Multer.File,
    user: UserDto,
  ): Promise<SetProfileImageDto> {
    try {
      const file = this.fileService.createFile(FileType.image, avatar);
      this.fileService.removeFile(user.profile_image);
      await this.updateUserByEmail(user.email, { profile_image: file });

      return { file };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  private async hashPassword(payload: UpdateUserDto): Promise<UpdateUserDto> {
    try {
      const user = { ...payload };
      if (user.password) {
        const hashedPassword = await bcrypt.hash(
          user.password,
          +this.configService.get('BCRYPT_SALT_ROUNDS'),
        );
        user.password = hashedPassword;
      }

      return user;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async addUserInfo(payload: UpdateUserDto, user: UserDto): Promise<void> {
    try {
      await this.updateUserByEmail(user.email, payload);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async addEducationInfo(
    payload: AddUserEducationDto,
    user: UserDto,
  ): Promise<void> {
    try {
      const currentUser = await this.findByEmail(user.email);
      await this.addEducationToUser(currentUser, payload);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async addWorkhistoryInfo(
    payload: AddUserWorkhistoryDto,
    user: UserDto,
  ): Promise<void> {
    try {
      const currentUser = await this.findByEmail(user.email);
      await this.addWorkToUser(currentUser, payload);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async getFheelancerInformation(
    take: number,
    page: number,
  ): Promise<[User[], number]> {
    try {
      const currentUser = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.category', 'category')
        .skip((page - 1) * take)
        .take(take)
        .getManyAndCount();

      return currentUser;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async addCategoryInfo(payload: Category, user: User): Promise<void> {
    try {
      const currentUser = await this.findByEmail(user.email);
      await this.userRepository
        .createQueryBuilder()
        .relation(User, 'category')
        .of({ id: currentUser.id })
        .set({ id: payload.id });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async getCategoryInfo(): Promise<Category[]> {
    try {
      const Categories = await this.categoryRepository
        .createQueryBuilder('category')
        .getMany();

      return Categories;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}
