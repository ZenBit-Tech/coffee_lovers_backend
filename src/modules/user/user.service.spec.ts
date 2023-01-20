import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { BadRequestException } from '@nestjs/common';
import { User } from '@entities/User.entity';
import { Education } from '@entities/Education.entity';
import { WorkHistory } from '@entities/WorkHistory.entity';
import { Request } from '@entities/Request.entity';
import { Category } from '@entities/Category.entity';
import { getRepositoryProvider, mockRepository } from '@utils/tests';
import {
  educationPayload,
  workhistoryPayload,
  fullFreelancerMockData,
} from '@/common/constants/mockdata';
import { MailService } from '@/modules/mail/mail.service';
import { FileService } from '@/modules/file/file.service';
import {
  getFavoritesParams,
  mockFreelancer1,
  mockSetFavoritesDto,
} from '@/common/mocks/users';
import { Favorites } from '@/common/entities/Favorites.entity';
import { FreelancerRating } from '@/common/entities/FreelancerRating.entity';
import { Job } from '@/common/entities/Job.entity';
import { UserService } from './user.service';
import UserDto from './dto/user.dto';

describe('UserService', () => {
  let userService: UserService;

  const mockConfigService = {
    get: () => '',
  };
  const mockMailService = {
    sendResetPassword: (user: User) => {},
  };
  const mockFileService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        getRepositoryProvider(User),
        getRepositoryProvider(Category),
        getRepositoryProvider(Education),
        getRepositoryProvider(WorkHistory),
        getRepositoryProvider(Favorites),
        getRepositoryProvider(FreelancerRating),
        getRepositoryProvider(Job),
        getRepositoryProvider(Request),
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: MailService,
          useValue: mockMailService,
        },
        {
          provide: FileService,
          useValue: mockFileService,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  describe('getWorkInfo', () => {
    it('should return work history', async (): Promise<void> => {
      const user = { id: 1 } as UserDto;
      expect(await userService.getWorkInfo(user)).toEqual([]);
    });
  });

  describe('getEducationInfo', () => {
    it('should return education information', async (): Promise<void> => {
      const user = { id: 1 } as UserDto;
      expect(await userService.getEducationInfo(user)).toEqual([]);
    });
  });

  describe('getFreelancerInfoById', () => {
    it('should return freelancer full info by id', async (): Promise<void> => {
      const id = 1;
      expect(await userService.getFreelancerInfoById(id)).toEqual({});
    });
    it('should return freelancer full info by id from findOne method', async (): Promise<void> => {
      const id = 1;
      jest
        .spyOn(userService, 'findOne')
        .mockResolvedValue(fullFreelancerMockData);
      expect(await userService.getFreelancerInfoById(id)).toEqual(
        fullFreelancerMockData,
      );
    });
  });

  describe('addUserInfo', () => {
    it('should update user information (without skills)', async (): Promise<void> => {
      const user = { id: 1 } as UserDto;
      const payload = { first_name: 'John' };
      jest.spyOn(mockRepository, 'createQueryBuilder');

      await userService.addUserInfo(payload, user);

      expect(mockRepository.createQueryBuilder).toHaveBeenCalledTimes(1);
    });

    it('should update user information (with skills)', async (): Promise<void> => {
      const user = { id: 1 } as UserDto;
      const payload = { first_name: 'John', skills: [1, 2] };
      jest.spyOn(mockRepository, 'createQueryBuilder');

      await userService.addUserInfo(payload, user);

      expect(mockRepository.createQueryBuilder).toHaveBeenCalledTimes(3);
    });
  });

  describe('addEducationToUser', () => {
    it('should create/update user education information', async (): Promise<void> => {
      const user = {
        id: 6,
      } as User;
      jest.spyOn(mockRepository, 'createQueryBuilder');
      await userService.addEducationToUser(user, educationPayload);

      expect(mockRepository.createQueryBuilder).toHaveBeenCalledTimes(2);
    });
  });

  describe('addEducationInfo', () => {
    it('should pass data to addEducationToUser method', async (): Promise<void> => {
      const user = { id: 1, email: 'test@test.com' } as User;
      const currentUser = { id: 2, email: 'test2@test.com' } as User;

      jest.spyOn(userService, 'findByEmail').mockResolvedValue(currentUser);
      jest.spyOn(userService, 'addEducationToUser');

      await userService.addEducationInfo(educationPayload, user);

      expect(userService.addEducationToUser).toBeCalledWith(
        currentUser,
        educationPayload,
      );
    });
  });

  describe('addWorkToUser', () => {
    it('should create/update user workhistory information', async (): Promise<void> => {
      const user = {
        id: 6,
      } as User;
      jest.spyOn(mockRepository, 'createQueryBuilder');
      await userService.addWorkToUser(user, workhistoryPayload);

      expect(mockRepository.createQueryBuilder).toHaveBeenCalledTimes(2);
    });
  });

  describe('addWorkhistoryInfo', () => {
    it('should pass data to addWorkToUser method', async (): Promise<void> => {
      const user = { id: 1, email: 'test@test.com' } as User;
      const currentUser = { id: 2, email: 'test2@test.com' } as User;

      jest.spyOn(userService, 'findByEmail').mockResolvedValue(currentUser);
      jest.spyOn(userService, 'addWorkToUser');

      await userService.addWorkhistoryInfo(workhistoryPayload, user);

      expect(userService.addWorkToUser).toBeCalledWith(
        currentUser,
        workhistoryPayload,
      );
    });
  });

  describe('setFavorite', () => {
    it('should add or delete new favorite', async (): Promise<void> => {
      jest.spyOn(userService, 'setFavorite');
      jest.spyOn(mockRepository, 'createQueryBuilder');
      await userService.setFavorite(
        mockFreelancer1 as UserDto,
        mockSetFavoritesDto,
      );

      expect(mockRepository.createQueryBuilder).toHaveBeenCalledTimes(1);
      expect(userService.setFavorite).toBeCalledWith(
        mockFreelancer1 as UserDto,
        mockSetFavoritesDto,
      );
    });

    it('should reject: query builder called incorrect amount of times', async (): Promise<void> => {
      jest.spyOn(mockRepository, 'createQueryBuilder');
      await userService.setFavorite(
        mockFreelancer1 as UserDto,
        mockSetFavoritesDto,
      );

      expect(mockRepository.createQueryBuilder).not.toHaveBeenCalledTimes(2);
    });

    it('should reject: service called with wrong data', async (): Promise<void> => {
      jest.spyOn(userService, 'setFavorite');
      await userService.setFavorite(
        mockFreelancer1 as UserDto,
        mockSetFavoritesDto,
      );

      expect(userService.setFavorite).not.toBeCalledWith(
        mockFreelancer1 as UserDto,
        { id: '5' },
      );
    });
  });

  describe('getFavorites', () => {
    it('should return favorites', async (): Promise<void> => {
      jest.spyOn(mockRepository, 'createQueryBuilder');

      expect(
        await userService.getFavorites(
          mockFreelancer1 as UserDto,
          getFavoritesParams,
        ),
      ).toEqual({});

      expect(mockRepository.createQueryBuilder).toHaveBeenCalledTimes(1);
    });

    it('should NOT return favorites, incorrect return type', async (): Promise<void> => {
      expect(
        await userService.getFavorites(
          mockFreelancer1 as UserDto,
          getFavoritesParams,
        ),
      ).not.toEqual([]);
    });

    it('should call correct methods inside queryBuilder', async (): Promise<void> => {
      jest.spyOn(mockRepository.createQueryBuilder(), 'getManyAndCount');
      jest.spyOn(mockRepository.createQueryBuilder(), 'getMany');

      await userService.getFavorites(
        mockFreelancer1 as UserDto,
        getFavoritesParams,
      );

      expect(
        mockRepository.createQueryBuilder().getManyAndCount,
      ).toHaveBeenCalledTimes(1);
      expect(
        mockRepository.createQueryBuilder().getMany,
      ).not.toHaveBeenCalled();
    });
  });

  describe('resetPassword', () => {
    it('wrong reset key: should throw bad request exception', async (): Promise<void> => {
      const dto = { password: 'Qwerty123', key: '123' };
      jest.spyOn(userService, 'findOne').mockImplementation(() => null);

      await expect(userService.resetPassword(dto)).rejects.toEqual(
        new BadRequestException('Invalid key'),
      );
    });

    it('should update hashed password', async (): Promise<void> => {
      const dto = { password: 'Qwerty123', key: '123' };
      const payload = { password: 'hashedPassword' };
      const user = { id: 1, email: 'test@test.com' } as User;

      jest.spyOn(userService, 'findOne').mockResolvedValue(user);
      jest.spyOn(userService, 'hashPassword').mockResolvedValue(payload);
      jest.spyOn(userService, 'updateUserByEmail');

      await userService.resetPassword(dto);

      expect(userService.updateUserByEmail).toBeCalledWith(user.email, {
        ...payload,
        reset_password_key: null,
      });
    });
  });

  describe('passwordResetRequest', () => {
    it('wrong email: should not call sendResetPassword in mail service', async (): Promise<void> => {
      const dto = { email: 'test@test.com' };

      jest.spyOn(userService, 'findByEmail').mockResolvedValue(null);
      jest.spyOn(mockMailService, 'sendResetPassword');

      await userService.sendPasswordResetMail(dto);

      expect(mockMailService.sendResetPassword).not.toBeCalled();
    });

    it('should call sendResetPassword in mail service', async (): Promise<void> => {
      const dto = { email: 'test@test.com' };
      const user = { id: 1, email: dto.email } as User;

      jest.spyOn(userService, 'findByEmail').mockResolvedValue(user);
      jest.spyOn(mockMailService, 'sendResetPassword');

      await userService.sendPasswordResetMail(dto);

      expect(mockMailService.sendResetPassword).toBeCalledWith(user);
    });
  });
});
