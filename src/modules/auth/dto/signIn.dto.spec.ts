import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import SignInDto from './signIn.dto';

describe('SignInDto', () => {
  const dto: SignInDto = {
    email: 'test@test.com',
    password: 'Qwerty123',
  };

  it('SignInDto should be validated successfully', async () => {
    const errors = await validate(plainToClass(SignInDto, dto));
    expect(errors.length).toBe(0);
  });

  it('wrong email type: should be an error', async () => {
    const errors = await validate(
      plainToClass(SignInDto, { ...dto, email: 'test@test' }),
    );
    expect(errors.length).not.toBe(0);
  });

  it('email does not exist: should be an error', async () => {
    const errors = await validate(
      plainToClass(SignInDto, { password: 'Qwerty123' }),
    );
    expect(errors.length).not.toBe(0);
  });
});
