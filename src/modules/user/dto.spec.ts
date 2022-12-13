import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { EnglishLevel } from '@constants/entities';
import AddUserInfoDto from './dto/add-user-info.dto';

describe('User Dto', () => {
  describe('AddUserInfoDto', () => {
    it('english level should be validated successfully', async () => {
      const dto = { english_level: EnglishLevel.INTERMEDIATE };
      const errors = await validate(plainToClass(AddUserInfoDto, dto));
      expect(errors.length).toBe(0);
    });

    it('wrong english level type: should be an error', async () => {
      const dto = { english_level: 'test' };
      const errors = await validate(plainToClass(AddUserInfoDto, dto));
      expect(errors.length).not.toBe(0);
    });

    it('hourly rate should be validated successfully', async () => {
      const dto = { hourly_rate: 15 };
      const errors = await validate(plainToClass(AddUserInfoDto, dto));
      expect(errors.length).toBe(0);
    });

    it('wrong hourly rate type: should be an error', async () => {
      const dto = { hourly_rate: '15' };
      const errors = await validate(plainToClass(AddUserInfoDto, dto));
      expect(errors.length).not.toBe(0);
    });
  });
});
