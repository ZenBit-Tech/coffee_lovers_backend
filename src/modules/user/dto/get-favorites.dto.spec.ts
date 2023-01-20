import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { mockGetFavoritesDto } from '@/common/mocks/users';
import GetFavoritesDto from './get-favorites.dto';

describe('GetFavoritesDto', () => {
  it('all fields from get favorites dto should be validated successfully', async (): Promise<void> => {
    const errors = await validate(
      plainToClass(GetFavoritesDto, mockGetFavoritesDto),
    );
    expect(errors.length).toBe(0);
  });

  it('wrong totalCount field type: should be an error', async (): Promise<void> => {
    const errors = await validate(
      plainToClass(GetFavoritesDto, {
        ...mockGetFavoritesDto,
        totalCount: '12',
      }),
    );
    expect(errors.length).not.toBe(0);
  });

  it('wrong is_favorite field type: should be an error', async (): Promise<void> => {
    const errors = await validate(
      plainToClass(GetFavoritesDto, {
        ...mockGetFavoritesDto,
        favorites: 123,
      }),
    );
    expect(errors.length).not.toBe(0);
  });
});
