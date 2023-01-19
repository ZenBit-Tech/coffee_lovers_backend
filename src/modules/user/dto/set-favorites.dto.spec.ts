import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { mockSetFavoritesDto } from '@/common/mocks/users';
import SetFavoritesDto from './set-favorites.dto';

describe('SetFavoritesDto', () => {
  it('all fields from set favorites dto should be validated successfully', async (): Promise<void> => {
    const errors = await validate(
      plainToClass(SetFavoritesDto, mockSetFavoritesDto),
    );
    expect(errors.length).toBe(0);
  });

  it('wrong freelancer id field type: should be an error', async (): Promise<void> => {
    const errors = await validate(
      plainToClass(SetFavoritesDto, { ...mockSetFavoritesDto, id: false }),
    );
    expect(errors.length).not.toBe(0);
  });

  it('wrong is_favorite field type: should be an error', async (): Promise<void> => {
    const errors = await validate(
      plainToClass(SetFavoritesDto, {
        ...mockSetFavoritesDto,
        is_favorite: '1',
      }),
    );
    expect(errors.length).not.toBe(0);
  });
});
