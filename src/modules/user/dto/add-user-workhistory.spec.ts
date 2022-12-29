import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import AddUserWorkhistoryDto from './add-user-workhistory.dto';

describe('AddUserInfoDto', () => {
  it('workhistory description should be validated successfully', async (): Promise<void> => {
    const dto = { work_history_descr: 'description' };
    const errors = await validate(plainToClass(AddUserWorkhistoryDto, dto));
    expect(errors.length).toBe(0);
  });

  it('wrong workhistory description type: should be an error', async (): Promise<void> => {
    const dto = { work_history_descr: 15 };
    const errors = await validate(plainToClass(AddUserWorkhistoryDto, dto));
    expect(errors.length).not.toBe(0);
  });

  it('workhistory from time should be validated successfully', async (): Promise<void> => {
    const dto = { work_history_from: '2015' };
    const errors = await validate(plainToClass(AddUserWorkhistoryDto, dto));
    expect(errors.length).toBe(0);
  });

  it('wrong workhistory from description type: should be an error', async (): Promise<void> => {
    const dto = { work_history_from: 2015 };
    const errors = await validate(plainToClass(AddUserWorkhistoryDto, dto));
    expect(errors.length).not.toBe(0);
  });

  it('workhistory to time should be validated successfully', async (): Promise<void> => {
    const dto = { work_history_to: '2017' };
    const errors = await validate(plainToClass(AddUserWorkhistoryDto, dto));
    expect(errors.length).toBe(0);
  });

  it('wrong education to description type: should be an error', async (): Promise<void> => {
    const dto = { work_history_to: ['2017'] };
    const errors = await validate(plainToClass(AddUserWorkhistoryDto, dto));
    expect(errors.length).not.toBe(0);
  });
});
