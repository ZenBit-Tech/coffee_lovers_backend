import { User } from '@entities/User.entity';
import { WorkHistory } from '@entities/WorkHistory.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ReqUser } from './dto/get-user-dto.dto';
import AddUserInfoDto from './dto/add-user-info.dto';
import PasswordResetRequestDto from './dto/password-reset-request.dto';
import PasswordResetDto from './dto/password-reset.dto';

describe('UserController', () => {
  let userController: UserController;
  let reqUser: ReqUser;

  const mockUserService = {
    getWorkInfo: jest
      .fn()
      .mockImplementation((user: User) => [{ id: 1 } as WorkHistory]),
    addUserInfo: jest
      .fn()
      .mockImplementation((dto: AddUserInfoDto, user: User) => {}),
    sendPasswordResetMail: jest
      .fn()
      .mockImplementation((dto: PasswordResetRequestDto) => {}),
    resetPassword: jest.fn().mockImplementation((dto: PasswordResetDto) => {}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    userController = module.get<UserController>(UserController);

    reqUser = {
      user: {
        id: 1,
      } as User,
    };
  });

  describe('getUserInformation', () => {
    it('should return information about current user', async (): Promise<void> => {
      expect(await userController.getUserInformation(reqUser)).toBe(
        reqUser.user,
      );
    });
  });

  describe('getUserWorkInformation', () => {
    it('should call getWorkInfo in user service', async (): Promise<void> => {
      expect(await userController.getUserWorkInformation(reqUser)).toEqual([
        { id: expect.any(Number) } as WorkHistory,
      ]);

      expect(mockUserService.getWorkInfo).toHaveBeenCalledWith(reqUser.user);
    });
  });

  describe('addUserInfo', () => {
    it('should call addUserInfo in user service', async (): Promise<void> => {
      const payload: AddUserInfoDto = { first_name: 'John' };
      await userController.addUserInfo(reqUser, payload);

      expect(mockUserService.addUserInfo).toHaveBeenCalledWith(
        payload,
        reqUser.user,
      );
    });
  });

  describe('passwordResetRequest', () => {
    it('should call sendPasswordResetMail in user service', async (): Promise<void> => {
      const dto: PasswordResetRequestDto = { email: 'test@test.com' };
      await userController.passwordResetRequest(dto);

      expect(mockUserService.sendPasswordResetMail).toHaveBeenCalledWith(dto);
    });
  });

  describe('passwordReset', () => {
    it('should call resetPassword in user service', async (): Promise<void> => {
      const dto: PasswordResetDto = { key: 'test', password: 'Qwerty123' };
      await userController.passwordReset(dto);

      expect(mockUserService.resetPassword).toHaveBeenCalledWith(dto);
    });
  });
});
