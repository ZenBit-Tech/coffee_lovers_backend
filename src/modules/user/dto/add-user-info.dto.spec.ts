import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { EnglishLevel } from '@constants/entities';
import AddUserInfoDto from './add-user-info.dto';

describe('AddUserInfoDto', () => {
  it('password should be validated successfully', async (): Promise<void> => {
    const dto = { password: 'Qwerty123' };
    const errors = await validate(plainToClass(AddUserInfoDto, dto));
    expect(errors.length).toBe(0);
  });

  it('password does not meet requirements: should be an error', async (): Promise<void> => {
    const dto = { password: 'qwerty123' };
    const errors = await validate(plainToClass(AddUserInfoDto, dto));
    expect(errors.length).not.toBe(0);
  });

  it('password too short: should be an error', async (): Promise<void> => {
    const dto = { password: 'Qw1' };
    const errors = await validate(plainToClass(AddUserInfoDto, dto));
    expect(errors.length).not.toBe(0);
  });

  it('english level should be validated successfully', async (): Promise<void> => {
    const dto = { english_level: EnglishLevel.INTERMEDIATE };
    const errors = await validate(plainToClass(AddUserInfoDto, dto));
    expect(errors.length).toBe(0);
  });

  it('wrong english level type: should be an error', async (): Promise<void> => {
    const dto = { english_level: 'test' };
    const errors = await validate(plainToClass(AddUserInfoDto, dto));
    expect(errors.length).not.toBe(0);
  });

  it('hourly rate should be validated successfully', async (): Promise<void> => {
    const dto = { hourly_rate: 15 };
    const errors = await validate(plainToClass(AddUserInfoDto, dto));
    expect(errors.length).toBe(0);
  });

  it('wrong hourly rate type: should be an error', async (): Promise<void> => {
    const dto = { hourly_rate: '15' };
    const errors = await validate(plainToClass(AddUserInfoDto, dto));
    expect(errors.length).not.toBe(0);
  });

  it('skills should be validated successfully', async (): Promise<void> => {
    const dto = { skills: [1] };
    const errors = await validate(plainToClass(AddUserInfoDto, dto));
    expect(errors.length).toBe(0);
  });

  it('wrong skills type: should be an error', async (): Promise<void> => {
    const dto = { skills: 1 };
    const errors = await validate(plainToClass(AddUserInfoDto, dto));
    expect(errors.length).not.toBe(0);
  });

  it('wrong skill type inside array: should be an error', async (): Promise<void> => {
    const dto = { skills: ['1'] };
    const errors = await validate(plainToClass(AddUserInfoDto, dto));
    expect(errors.length).not.toBe(0);
  });
});
