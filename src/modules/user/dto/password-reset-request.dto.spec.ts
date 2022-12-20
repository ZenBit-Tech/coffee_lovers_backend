import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import PasswordResetRequestDto from './password-reset-request.dto';

describe('PasswordResetRequestDto', () => {
  it('email should be validated successfully', async (): Promise<void> => {
    const dto = { email: 'test@test.com' };
    const errors = await validate(plainToClass(PasswordResetRequestDto, dto));
    expect(errors.length).toBe(0);
  });

  it('email does not exist: should be an error', async (): Promise<void> => {
    const dto = {};
    const errors = await validate(plainToClass(PasswordResetRequestDto, dto));
    expect(errors.length).not.toBe(0);
  });

  it('wrong email type: should be an error', async (): Promise<void> => {
    const dto = { email: 'test@test' };
    const errors = await validate(plainToClass(PasswordResetRequestDto, dto));
    expect(errors.length).not.toBe(0);
  });
});
