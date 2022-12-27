import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import AddUserEducationDto from './add-user-education.dto';

describe('AddUserInfoDto', () => {
  it('education description should be validated successfully', async (): Promise<void> => {
    const dto = { education_descr: 'description' };
    const errors = await validate(plainToClass(AddUserEducationDto, dto));
    expect(errors.length).toBe(0);
  });

  it('wrong education description type: should be an error', async (): Promise<void> => {
    const dto = { education_descr: 15 };
    const errors = await validate(plainToClass(AddUserEducationDto, dto));
    expect(errors.length).not.toBe(0);
  });

  it('education from time should be validated successfully', async (): Promise<void> => {
    const dto = { education_from: '2015' };
    const errors = await validate(plainToClass(AddUserEducationDto, dto));
    expect(errors.length).toBe(0);
  });

  it('wrong education from description type: should be an error', async (): Promise<void> => {
    const dto = { education_from: 2015 };
    const errors = await validate(plainToClass(AddUserEducationDto, dto));
    expect(errors.length).not.toBe(0);
  });

  it('education to time should be validated successfully', async (): Promise<void> => {
    const dto = { education_to: '2017' };
    const errors = await validate(plainToClass(AddUserEducationDto, dto));
    expect(errors.length).toBe(0);
  });

  it('wrong education to description type: should be an error', async (): Promise<void> => {
    const dto = { education_to: ['2017'] };
    const errors = await validate(plainToClass(AddUserEducationDto, dto));
    expect(errors.length).not.toBe(0);
  });
});
