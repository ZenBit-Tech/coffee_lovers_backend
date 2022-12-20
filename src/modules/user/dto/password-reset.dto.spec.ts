import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import PasswordResetDto from './password-reset.dto';

describe('PasswordResetRequestDto', () => {
  it('should be validated successfully', async (): Promise<void> => {
    const dto = {
      password: 'Qwerty123',
      key: 'test',
    };
    const errors = await validate(plainToClass(PasswordResetDto, dto));
    expect(errors.length).toBe(0);
  });

  it('key does not exist: should be an error', async (): Promise<void> => {
    const dto = {
      password: 'Qwerty123',
    };
    const errors = await validate(plainToClass(PasswordResetDto, dto));
    expect(errors.length).not.toBe(0);
  });

  it('password does not meet requirements: should be an error', async (): Promise<void> => {
    const dto = {
      password: 'qwerty123',
      key: 'test',
    };
    const errors = await validate(plainToClass(PasswordResetDto, dto));
    expect(errors.length).not.toBe(0);
  });

  it('password too short: should be an error', async (): Promise<void> => {
    const dto = {
      password: 'Qw1',
      key: 'test',
    };
    const errors = await validate(plainToClass(PasswordResetDto, dto));
    expect(errors.length).not.toBe(0);
  });
});
