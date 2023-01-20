import { getRepositoryToken } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

export const createQueryBuilder = {
  select: () => createQueryBuilder,
  update: () => createQueryBuilder,
  delete: () => createQueryBuilder,
  from: () => createQueryBuilder,
  insert: () => createQueryBuilder,
  into: () => createQueryBuilder,
  values: () => createQueryBuilder,
  set: () => createQueryBuilder,
  addSelect: () => createQueryBuilder,
  groupBy: () => createQueryBuilder,
  where: () => createQueryBuilder,
  leftJoinAndSelect: () => createQueryBuilder,
  relation: () => createQueryBuilder,
  skip: () => createQueryBuilder,
  take: () => createQueryBuilder,
  of: () => createQueryBuilder,
  addAndRemove: () => ({}),
  execute: () => ({}),
  getOne: () => ({}),
  getMany: () => [],
  getManyAndCount: () => [],
};

export const mockRepository = {
  createQueryBuilder: () => createQueryBuilder,
};

export const getRepositoryProvider = (
  entity: EntityClassOrSchema,
  mockObject: object = mockRepository,
): {
  provide: string | Function;
  useValue: object;
} => ({
  provide: getRepositoryToken(entity),
  useValue: mockObject,
});
