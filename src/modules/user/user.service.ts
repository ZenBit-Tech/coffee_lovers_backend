import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
  HttpException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository, InsertResult } from 'typeorm';
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
import ProfileQuestionsDto from './dto/profile-questions.dto';
import UserDto from './dto/user.dto';
import SetProfileImageDto from './dto/set-profile-image.dto';
import { createUserProfilePayload } from './utils/payloads';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private configService: ConfigService,
    private mailService: MailService,

    @InjectRepository(Education)
    private educationRepository: Repository<Education>,

    @InjectRepository(WorkHistory)
    private workHistoryRepository: Repository<WorkHistory>,
    private fileService: FileService,
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
    payload: ProfileQuestionsDto,
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

  async addWorkToUser(user: User, payload: ProfileQuestionsDto): Promise<void> {
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

  async createUserProfile(
    payload: ProfileQuestionsDto,
    user: UserDto,
  ): Promise<void> {
    const { eduPayload, workPayload, userPayload } =
      createUserProfilePayload(payload);
    try {
      const currentUser = await this.findByEmail(user.email);
      await this.updateUserByEmail(user.email, userPayload);
      await this.addEducationToUser(currentUser, eduPayload);
      await this.addWorkToUser(currentUser, workPayload);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}
