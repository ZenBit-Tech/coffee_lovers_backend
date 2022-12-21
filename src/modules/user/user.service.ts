import {
  Injectable,
  Inject,
  InternalServerErrorException,
  BadRequestException,
  HttpException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository, InsertResult, Brackets } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '@entities/User.entity';
import { Education } from '@entities/Education.entity';
import { WorkHistory } from '@entities/WorkHistory.entity';
import { Request } from '@entities/Request.entity';
import { forwardRef } from '@nestjs/common/utils';
import { MailService } from '@/modules/mail/mail.service';
import { FileService } from '@/modules/file/file.service';
import { FileType } from '@/modules/file/types';
import { RequestType, Role } from '@/common/constants/entities';
import { Category } from '@/common/entities/Category.entity';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import PasswordResetRequestDto from './dto/password-reset-request.dto';
import PasswordResetDto from './dto/password-reset.dto';
import UserDto from './dto/user.dto';
import SetProfileImageDto from './dto/set-profile-image.dto';
import AddUserWorkhistoryDto from './dto/add-user-workhistory.dto';
import AddUserEducationDto from './dto/add-user-education.dto';
import AddUserInfoDto from './dto/add-user-info.dto';
import GetFreelancerDto from './dto/get-freelancer-params.dto';
import getUserProposalsResponseDto from './dto/get-proposals-by-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Education)
    private educationRepository: Repository<Education>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(WorkHistory)
    private workHistoryRepository: Repository<WorkHistory>,

    @InjectRepository(Request)
    private requestRepository: Repository<Request>,

    private readonly configService: ConfigService,
    @Inject(forwardRef(() => MailService))
    private readonly mailService: MailService,
    private readonly fileService: FileService,
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
    payload: AddUserEducationDto[],
  ): Promise<void> {
    try {
      await this.educationRepository
        .createQueryBuilder()
        .delete()
        .from(Education)
        .where({ user })
        .execute();
      await this.educationRepository
        .createQueryBuilder()
        .insert()
        .into(Education)
        .values(
          payload.map((el) => ({
            ...el,
            user,
          })),
        )
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
    payload: AddUserWorkhistoryDto[],
  ): Promise<void> {
    try {
      await this.workHistoryRepository
        .createQueryBuilder()
        .delete()
        .from(WorkHistory)
        .where({ user })
        .execute();
      await this.workHistoryRepository
        .createQueryBuilder()
        .insert()
        .into(WorkHistory)
        .values(
          payload.map((el) => ({
            ...el,
            user,
          })),
        )
        .execute();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async findOne(
    payload: object,
    hiddenColumns?: string[],
    leftJoins?: string[],
  ): Promise<User | null> {
    try {
      const query = this.userRepository
        .createQueryBuilder('user')
        .where(payload);

      if (hiddenColumns) {
        hiddenColumns.forEach((column) => {
          query.addSelect(`user.${column}`);
        });
      }

      if (leftJoins) {
        leftJoins.forEach((join) => {
          query.leftJoinAndSelect(`user.${join}`, join);
        });
      }

      return await query.getOne();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findByEmail(
    email: string,
    hiddenColumns?: string[],
    leftJoins?: string[],
  ): Promise<User | null> {
    try {
      const data = await this.findOne({ email }, hiddenColumns, leftJoins);

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
        return;
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

  async passwordResetCheckAvailability(key: string): Promise<boolean> {
    try {
      const user = await this.findOne({ reset_password_key: key });

      return !!user;
    } catch (error) {
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

  async hashPassword(payload: UpdateUserDto): Promise<UpdateUserDto> {
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

  async addUserInfo(payload: AddUserInfoDto, user: UserDto): Promise<void> {
    try {
      const { skills, category_id, ...payloadNoSkills } = payload;
      if (skills) {
        const userWithSkills = await this.userRepository
          .createQueryBuilder('user')
          .leftJoinAndSelect('user.skills', 'skills')
          .where('user.id = :id', { id: user.id })
          .getOne();
        await this.userRepository
          .createQueryBuilder()
          .relation(User, 'skills')
          .of(user.id)
          .addAndRemove(skills, userWithSkills.skills);
      }
      await this.updateUserByEmail(user.email, {
        ...payloadNoSkills,
        category: {
          id: category_id,
        } as Category,
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async addEducationInfo(
    payload: AddUserEducationDto[],
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
    payload: AddUserWorkhistoryDto[],
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

  async getWorkInfo(user: UserDto): Promise<WorkHistory[]> {
    try {
      const workHistories = await this.workHistoryRepository
        .createQueryBuilder()
        .where({ user })
        .getMany();

      return workHistories;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async getEducationInfo(user: UserDto): Promise<Education[]> {
    try {
      const educations = await this.educationRepository
        .createQueryBuilder()
        .where({ user })
        .getMany();

      return educations;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async getFheelancerInformation(
    params: GetFreelancerDto,
  ): Promise<[User[], number]> {
    try {
      const {
        page,
        take,
        skills,
        categories,
        hourly_rate_start,
        hourly_rate_end,
        search,
        ...userPayload
      } = params;
      const query = this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.category', 'category')
        .where(userPayload)
        .andWhere('user.role = :role', {
          role: Role.FREELANCER,
        })
        .skip((page - 1) * take)
        .take(take);

      if (hourly_rate_start) {
        query.andWhere('user.hourly_rate >= :hourly_rate_start', {
          hourly_rate_start,
        });
      }

      if (hourly_rate_end) {
        query.andWhere('user.hourly_rate <= :hourly_rate_end', {
          hourly_rate_end,
        });
      }

      if (search) {
        query.andWhere(
          'user.position LIKE :position OR user.category LIKE :position',
          { position: `%${search}%` },
        );
      }

      if (categories) {
        query.where('user.category.id IN (:...categories)', {
          categories,
        });
      }

      if (skills) {
        query.innerJoin('user.skills', 'skill', 'skill.id IN (:...skills)', {
          skills,
        });
      }

      const currentUser = await query.getManyAndCount();

      return currentUser;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async addCategoryInfo(payload: Category, user: User): Promise<void> {
    try {
      await this.userRepository
        .createQueryBuilder()
        .relation(User, 'category')
        .of({ id: user.id })
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

  async getProposalsByUser(
    user: UserDto,
  ): Promise<getUserProposalsResponseDto> {
    try {
      const proposals = await this.requestRepository
        .createQueryBuilder('request')
        .leftJoinAndSelect('request.job', 'job')
        .where({
          type: RequestType.PROPOSAL,
          freelancer: user,
        })
        .getMany();

      return {
        proposals: proposals.map((item) => ({
          id: item.id,
          hourly_rate: item.hourly_rate,
          cover_letter: item.cover_letter,
          job: item.job,
        })),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async getUserById(id: number): Promise<User> {
    try {
      const userInfo = await this.userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id })
        .getOne();

      return userInfo;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async setIfGoogle(bool: boolean, id: number): Promise<void> {
    try {
      await this.userRepository
        .createQueryBuilder()
        .update(User)
        .set({ is_google: bool })
        .where('id = :id', { id })
        .execute();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async getFreelancerInfoById(id: number): Promise<User> {
    try {
      const getUserInfo = await this.findOne(
        { id },
        [],
        ['educations', 'workHistory', 'category', 'skills'],
      );

      return getUserInfo;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}
