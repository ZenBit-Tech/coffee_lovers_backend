import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import GetJobInfoParamsDto from './dto/get-job-info-params-dto';

describe('Jobs Dto', () => {
  describe('GetJobInfoParamsDto', () => {
    it('should be validated successfully', async () => {
      const dto = { id: '1' };
      const errors = await validate(plainToClass(GetJobInfoParamsDto, dto));
      expect(errors.length).toBe(0);
    });

    it('without id: should be an error', async () => {
      const dto = {};
      const errors = await validate(plainToClass(GetJobInfoParamsDto, dto));
      expect(errors.length).not.toBe(0);
    });

    it('wrong id type: should be an error', async () => {
      const dto = { id: 'test' };
      const errors = await validate(plainToClass(GetJobInfoParamsDto, dto));
      expect(errors.length).not.toBe(0);
    });
  });
});
