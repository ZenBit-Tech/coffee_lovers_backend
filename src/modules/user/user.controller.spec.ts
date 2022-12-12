import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { User } from '@entities/User.entity';
import { WorkHistory } from '@entities/WorkHistory.entity';
import { Education } from '@entities/Education.entity';
import { Category } from '@entities/Category.entity';
import { Request } from '@entities/Request.entity';
import { MailService } from '@/modules/mail/mail.service';
import { FileService } from '@/modules/file/file.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ReqUser } from './dto/get-user-dto.dto';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let fileService: FileService;
  let mailService: MailService;
  let configService: ConfigService;

  let educationRepository: Repository<Education>;
  let categoryRepository: Repository<Category>;
  let userRepository: Repository<User>;
  let workHistoryRepository: Repository<WorkHistory>;
  let requestRepository: Repository<Request>;

  let reqUser: ReqUser;

  beforeEach(async () => {
    userService = new UserService(
      educationRepository,
      categoryRepository,
      userRepository,
      configService,
      mailService,
      fileService,
      workHistoryRepository,
      requestRepository,
    );

    userController = new UserController(userService);

    reqUser = {
      user: {
        id: 1,
      } as User,
    };
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('getUserInformation', () => {
    it('should return information about current user', async (): Promise<void> => {
      expect(await userController.getUserInformation(reqUser)).toBe(
        reqUser.user,
      );
    });
  });

  describe('getUserWorkInformation', () => {
    it('should return work history', async (): Promise<void> => {
      const result = [{ id: 1, work_history_descr: 'test' } as WorkHistory];

      jest
        .spyOn(userService, 'getWorkInfo')
        .mockImplementation(async () => result);

      expect(await userService.getWorkInfo(reqUser.user)).toBe(result);
    });
  });
});
