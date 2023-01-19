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
  andWhere: () => createQueryBuilder,
  leftJoinAndSelect: () => createQueryBuilder,
  loadRelationCountAndMap: () => createQueryBuilder,
  leftJoinAndMapOne: () => createQueryBuilder,
  innerJoin: () => createQueryBuilder,
  relation: () => createQueryBuilder,
  of: () => createQueryBuilder,
  limit: () => createQueryBuilder,
  offset: () => createQueryBuilder,
  orderBy: () => createQueryBuilder,
  addAndRemove: () => ({}),
  execute: () => ({}),
  getOne: () => ({}),
  getCount: () => 0,
  getMany: () => [],
  getManyAndCount: () => [[], 0],
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
