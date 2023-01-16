import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { createUserDto } from '@/common/mocks/auth';
import CreateUserDto from './create-user.dto';

describe('CreateUserDto', () => {
  it('CreateUserDto should be validated successfully', async () => {
    const errors = await validate(plainToClass(CreateUserDto, createUserDto));
    expect(errors.length).toBe(0);
  });

  it('wrong email type: should be an error', async () => {
    const errors = await validate(
      plainToClass(CreateUserDto, { ...createUserDto, email: 'test@test' }),
    );
    expect(errors.length).not.toBe(0);
  });

  it('wrong password type: should be an error', async () => {
    const errors = await validate(
      plainToClass(CreateUserDto, { ...createUserDto, password: 'qwerty123' }),
    );
    expect(errors.length).not.toBe(0);
  });

  it('first name is empty: should be an error', async () => {
    const errors = await validate(
      plainToClass(CreateUserDto, { ...createUserDto, first_name: '' }),
    );
    expect(errors.length).not.toBe(0);
  });

  it('last name is empty: should be an error', async () => {
    const errors = await validate(
      plainToClass(CreateUserDto, { ...createUserDto, last_name: '' }),
    );
    expect(errors.length).not.toBe(0);
  });
});
