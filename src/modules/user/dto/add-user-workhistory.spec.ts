import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import AddUserWorkhistoryDto from './add-user-workhistory.dto';
import { mockAddUserWorkhistoryDto } from '@/common/mocks/users';

describe('AddUserWorkhistoryDto', () => {
  it('all fields from add user workhistory dto should be validated successfully', async (): Promise<void> => {
    const errors = await validate(
      plainToClass(AddUserWorkhistoryDto, mockAddUserWorkhistoryDto),
    );
    expect(errors.length).toBe(0);
  });

  it('wrong workhistory description type: should be an error', async (): Promise<void> => {
    const errors = await validate(
      plainToClass(AddUserWorkhistoryDto, {
        ...mockAddUserWorkhistoryDto,
        work_history_descr: 15,
      }),
    );
    expect(errors.length).not.toBe(0);
  });

  it('wrong workhistory from description type: should be an error', async (): Promise<void> => {
    const errors = await validate(
      plainToClass(AddUserWorkhistoryDto, {
        ...mockAddUserWorkhistoryDto,
        work_history_from: 2015,
      }),
    );
    expect(errors.length).not.toBe(0);
  });

  it('wrong education to description type: should be an error', async (): Promise<void> => {
    const errors = await validate(
      plainToClass(AddUserWorkhistoryDto, {
        ...mockAddUserWorkhistoryDto,
        work_history_to: ['2017'],
      }),
    );
    expect(errors.length).not.toBe(0);
  });
});
