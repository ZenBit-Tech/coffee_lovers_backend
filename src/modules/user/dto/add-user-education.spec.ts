import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import AddUserEducationDto from './add-user-education.dto';
import { mockAddUserEducationDto } from '@/common/mocks/users';

describe('AddUserEducationDto', () => {
  it('all fields from add user education dto should be validated successfully', async (): Promise<void> => {
    const errors = await validate(
      plainToClass(AddUserEducationDto, mockAddUserEducationDto),
    );
    expect(errors.length).toBe(0);
  });

  it('wrong education description type: should be an error', async (): Promise<void> => {
    const errors = await validate(
      plainToClass(AddUserEducationDto, {
        ...mockAddUserEducationDto,
        education_descr: true,
      }),
    );
    expect(errors.length).not.toBe(0);
  });

  it('wrong education from description type: should be an error', async (): Promise<void> => {
    const errors = await validate(
      plainToClass(AddUserEducationDto, {
        ...mockAddUserEducationDto,
        education_from: 2014,
      }),
    );
    expect(errors.length).not.toBe(0);
  });

  it('wrong education to description type: should be an error', async (): Promise<void> => {
    const errors = await validate(
      plainToClass(AddUserEducationDto, {
        ...mockAddUserEducationDto,
        education_to: false,
      }),
    );
    expect(errors.length).not.toBe(0);
  });
});
