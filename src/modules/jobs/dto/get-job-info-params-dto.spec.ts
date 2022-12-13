import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import GetJobInfoParamsDto from './get-job-info-params-dto';

describe('GetJobInfoParamsDto', () => {
  it('should be validated successfully', async (): Promise<void> => {
    const dto = { id: '1' };
    const errors = await validate(plainToClass(GetJobInfoParamsDto, dto));
    expect(errors.length).toBe(0);
  });

  it('id does not exist: should be an error', async (): Promise<void> => {
    const dto = {};
    const errors = await validate(plainToClass(GetJobInfoParamsDto, dto));
    expect(errors.length).not.toBe(0);
  });

  it('wrong id type: should be an error', async (): Promise<void> => {
    const dto = { id: 'test' };
    const errors = await validate(plainToClass(GetJobInfoParamsDto, dto));
    expect(errors.length).not.toBe(0);
  });
});
