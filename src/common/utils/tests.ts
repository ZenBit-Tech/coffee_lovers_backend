import { getRepositoryToken } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

export const getRepositoryProvider = (
  entity: EntityClassOrSchema,
  mockObject: object,
) => ({
  provide: getRepositoryToken(entity),
  useValue: mockObject,
});
