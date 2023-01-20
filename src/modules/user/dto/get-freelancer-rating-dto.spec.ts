import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { mockGetFreelancerRatingDto } from '@/common/mocks/users';
import GetFreelancerRating from './get-freelancer-rating.dto';

describe('GetFreelancerRating', () => {
  it('all fields from get freelancer rating dto should be validated successfully', async (): Promise<void> => {
    const errors = await validate(
      plainToClass(GetFreelancerRating, mockGetFreelancerRatingDto),
    );
    expect(errors.length).toBe(0);
  });

  it('wrong freelancer field type: should be an error', async (): Promise<void> => {
    const errors = await validate(
      plainToClass(GetFreelancerRating, {
        ...mockGetFreelancerRatingDto,
        freelancer: false,
      }),
    );
    expect(errors.length).not.toBe(0);
  });

  it('wrong created_at field type: should be an error', async (): Promise<void> => {
    const errors = await validate(
      plainToClass(GetFreelancerRating, {
        ...mockGetFreelancerRatingDto,
        created_at: [1993],
      }),
    );
    expect(errors.length).not.toBe(0);
  });

  it('wrong job_owner field type: should be an error', async (): Promise<void> => {
    const errors = await validate(
      plainToClass(GetFreelancerRating, {
        ...mockGetFreelancerRatingDto,
        job_owner: [{ name: 123 }],
      }),
    );
    expect(errors.length).not.toBe(0);
  });
});
