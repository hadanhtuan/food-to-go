import {
  DataSource,
  EntityTarget,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { IResponse } from '../response';
import { IPaginate } from '../request';

export interface IBaseRepository {
  create<T>(
    dataSource: DataSource,
    entity: EntityTarget<T>,
    payload: QueryDeepPartialEntity<T> | QueryDeepPartialEntity<T>[],
  ): Promise<IResponse<T>>;

  update<T>(
    dataSource: DataSource,
    entity: EntityTarget<T>,
    where: FindOptionsWhere<T>,
    payload: QueryDeepPartialEntity<T> | QueryDeepPartialEntity<T>[],
  ): Promise<IResponse<T>>;

  queryOne<T>(
    dataSource: DataSource,
    entity: EntityTarget<T>,
    where: FindOneOptions<T>,
  ): Promise<IResponse<T> | null>;

  query<T>(
    dataSource: DataSource,
    entity: EntityTarget<T>,
    where: FindManyOptions<T>,
    paginate: IPaginate,
  ): Promise<IResponse<T[]> | null>;
}
