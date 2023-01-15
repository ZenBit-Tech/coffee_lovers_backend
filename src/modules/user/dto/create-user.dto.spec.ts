import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import CreateUserDto from './create-user.dto';

describe('CreateUserDto', () => {
  const dto: CreateUserDto = {
    email: 'test@test.com',
    password: 'Qwerty123',
    first_name: 'John',
    last_name: 'Doe',
  };

  it('CreateUserDto should be validated successfully', async () => {
    const errors = await validate(plainToClass(CreateUserDto, dto));
    expect(errors.length).toBe(0);
  });

  it('wrong email type: should be an error', async () => {
    const errors = await validate(
      plainToClass(CreateUserDto, { ...dto, email: 'test@test' }),
    );
    expect(errors.length).not.toBe(0);
  });

  it('wrong password type: should be an error', async () => {
    const errors = await validate(
      plainToClass(CreateUserDto, { ...dto, password: 'qwerty123' }),
    );
    expect(errors.length).not.toBe(0);
  });

  it('first name is empty: should be an error', async () => {
    const errors = await validate(
      plainToClass(CreateUserDto, { ...dto, first_name: '' }),
    );
    expect(errors.length).not.toBe(0);
  });

  it('last name is empty: should be an error', async () => {
    const errors = await validate(
      plainToClass(CreateUserDto, { ...dto, last_name: '' }),
    );
    expect(errors.length).not.toBe(0);
  });
});
