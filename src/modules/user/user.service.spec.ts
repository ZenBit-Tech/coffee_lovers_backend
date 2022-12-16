import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { BadRequestException } from '@nestjs/common';
import { User } from '@entities/User.entity';
import { Education } from '@entities/Education.entity';
import { WorkHistory } from '@entities/WorkHistory.entity';
import { Request } from '@entities/Request.entity';
import { Category } from '@entities/Category.entity';
import { getRepositoryProvider, mockRepository } from '@utils/tests';
import { MailService } from '@/modules/mail/mail.service';
import { FileService } from '@/modules/file/file.service';
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

  describe('resetPassword', () => {
    it('wrong reset key: should throw an error', async (): Promise<void> => {
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
