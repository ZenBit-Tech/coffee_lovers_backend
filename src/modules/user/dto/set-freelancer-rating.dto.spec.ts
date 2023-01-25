import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { mockSetFreelancerRatingDto } from '@/common/mocks/users';
import SetFreelancerRatingDto from './set-freelancer-rating.dto';

describe('SetFreelancerRatingDto', () => {
  it('all fields from set freelancer rating dto should be validated successfully', async (): Promise<void> => {
    const errors = await validate(
      plainToClass(SetFreelancerRatingDto, mockSetFreelancerRatingDto),
    );
    expect(errors.length).toBe(0);
  });

  it('wrong freelancer id field type: should be an error', async (): Promise<void> => {
    const errors = await validate(
      plainToClass(SetFreelancerRatingDto, {
        ...mockSetFreelancerRatingDto,
        freelancer_id: false,
      }),
    );
    expect(errors.length).not.toBe(0);
  });

  it('wrong rating field type: should be an error', async (): Promise<void> => {
    const errors = await validate(
      plainToClass(SetFreelancerRatingDto, {
        ...mockSetFreelancerRatingDto,
        rating: [5],
      }),
    );
    expect(errors.length).not.toBe(0);
  });

  it('wrong rating_comment field type: should be an error', async (): Promise<void> => {
    const errors = await validate(
      plainToClass(SetFreelancerRatingDto, {
        ...mockSetFreelancerRatingDto,
        rating_comment: {},
      }),
    );
    expect(errors.length).not.toBe(0);
  });

  it('wrong job_id field type: should be an error', async (): Promise<void> => {
    const errors = await validate(
      plainToClass(SetFreelancerRatingDto, {
        ...mockSetFreelancerRatingDto,
        job_id: '10',
      }),
    );
    expect(errors.length).not.toBe(0);
  });
});
