import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import {
  mockSetFreelancerRatingDto,
  mockUpdateUserDto,
} from '@/common/mocks/users';
import UpdateUserDto from './update-user.dto';

describe('UpdateUserDto', () => {
  it('all fields from update user dto should be validated successfully', async (): Promise<void> => {
    const errors = await validate(
      plainToClass(UpdateUserDto, mockUpdateUserDto),
    );
    expect(errors.length).toBe(0);
  });

  it('wrong password field type: should be an error', async (): Promise<void> => {
    const errors = await validate(
      plainToClass(UpdateUserDto, {
        ...mockSetFreelancerRatingDto,
        password: '123',
      }),
    );
    expect(errors.length).not.toBe(0);
  });

  it('wrong first_name field type: should be an error', async (): Promise<void> => {
    const errors = await validate(
      plainToClass(UpdateUserDto, {
        ...mockSetFreelancerRatingDto,
        first_name: ['dean'],
      }),
    );
    expect(errors.length).not.toBe(0);
  });

  it('wrong last_name field type: should be an error', async (): Promise<void> => {
    const errors = await validate(
      plainToClass(UpdateUserDto, {
        ...mockSetFreelancerRatingDto,
        last_name: { name: 'John' },
      }),
    );
    expect(errors.length).not.toBe(0);
  });

  it('wrong profile_image field type: should be an error', async (): Promise<void> => {
    const errors = await validate(
      plainToClass(UpdateUserDto, {
        ...mockSetFreelancerRatingDto,
        profile_image: false,
      }),
    );
    expect(errors.length).not.toBe(0);
  });

  it('wrong reset_password_key field type: should be an error', async (): Promise<void> => {
    const errors = await validate(
      plainToClass(UpdateUserDto, {
        ...mockSetFreelancerRatingDto,
        reset_password_key: ['10'],
      }),
    );
    expect(errors.length).not.toBe(0);
  });

  it('wrong available_time field type: should be an error', async (): Promise<void> => {
    const errors = await validate(
      plainToClass(UpdateUserDto, {
        ...mockSetFreelancerRatingDto,
        available_time: 11,
      }),
    );
    expect(errors.length).not.toBe(0);
  });

  it('wrong description field type: should be an error', async (): Promise<void> => {
    const errors = await validate(
      plainToClass(UpdateUserDto, {
        ...mockSetFreelancerRatingDto,
        description: false,
      }),
    );
    expect(errors.length).not.toBe(0);
  });

  it('wrong hourly_rate field type: should be an error', async (): Promise<void> => {
    const errors = await validate(
      plainToClass(UpdateUserDto, {
        ...mockSetFreelancerRatingDto,
        hourly_rate: '10',
      }),
    );
    expect(errors.length).not.toBe(0);
  });

  it('wrong position field type: should be an error', async (): Promise<void> => {
    const errors = await validate(
      plainToClass(UpdateUserDto, {
        ...mockSetFreelancerRatingDto,
        position: ['Full-Stack'],
      }),
    );
    expect(errors.length).not.toBe(0);
  });

  it('wrong other_experience field type: should be an error', async (): Promise<void> => {
    const errors = await validate(
      plainToClass(UpdateUserDto, {
        ...mockSetFreelancerRatingDto,
        other_experience: 123,
      }),
    );
    expect(errors.length).not.toBe(0);
  });

  it('wrong english_level field type: should be an error', async (): Promise<void> => {
    const errors = await validate(
      plainToClass(UpdateUserDto, {
        ...mockSetFreelancerRatingDto,
        english_level: 'intermediate',
      }),
    );
    expect(errors.length).not.toBe(0);
  });

  it('wrong category field type: should be an error', async (): Promise<void> => {
    const errors = await validate(
      plainToClass(UpdateUserDto, {
        ...mockSetFreelancerRatingDto,
        category: 'Front-end',
      }),
    );
    expect(errors.length).not.toBe(0);
  });

  it('wrong role field type: should be an error', async (): Promise<void> => {
    const errors = await validate(
      plainToClass(UpdateUserDto, {
        ...mockSetFreelancerRatingDto,
        role: { a: '10' },
      }),
    );
    expect(errors.length).not.toBe(0);
  });

  it('wrong average_rating field type: should be an error', async (): Promise<void> => {
    const errors = await validate(
      plainToClass(UpdateUserDto, {
        ...mockSetFreelancerRatingDto,
        average_rating: '4.2',
      }),
    );
    expect(errors.length).not.toBe(0);
  });
});
