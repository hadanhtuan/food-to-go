import { APIStatus } from '@libs/common/enum';
import { IBaseRepository } from '@libs/common/interface/postgre';
import { IPaginate } from '@libs/common/interface/request';
import { IResponse } from '@libs/common/interface/response';
import { HttpException } from '@nestjs/common';
import {
  DataSource,
  EntityTarget,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class PostgresRepository implements IBaseRepository {
  async create<T>(
    dataSource: DataSource,
    entity: EntityTarget<T>,
    payload: QueryDeepPartialEntity<T> | QueryDeepPartialEntity<T>[],
  ): Promise<IResponse<T>> {
    try {
      const repo = dataSource.getRepository(entity);

      const record = await repo.save<T>(payload as T);
      const response: IResponse<T> = {
        data: record,
        statusCode: APIStatus.Created,
        total: 1,
      };
      return response;
    } catch (error) {
      throw new HttpException(
        error?.message || null,
        error?.status || APIStatus.ServerError,
      );
    }
  }
  async update<T>(
    dataSource: DataSource,
    entity: EntityTarget<T>,
    where: FindOptionsWhere<T>,
    payload: QueryDeepPartialEntity<T>,
  ): Promise<IResponse<T>> {
    try {
      const repo = dataSource.getRepository(entity);

      await repo.update(where, payload);

      const response: IResponse<T> = {
        statusCode: APIStatus.Ok,
        total: 1,
      };

      return response;
    } catch (error) {
      throw new HttpException(
        error?.message || null,
        error?.status || APIStatus.ServerError,
      );
    }
  }

  async queryOne<T>(
    dataSource: DataSource,
    entity: EntityTarget<T>,
    where: FindOneOptions<T>,
  ): Promise<IResponse<T> | null> {
    try {
      const repo = dataSource.getRepository(entity);

      const record = await repo.findOne(where);

      if (!record) {
        return {
          statusCode: APIStatus.NotFound,
          total: 0,
        };
      }

      const response: IResponse<T> = {
        data: record,
        statusCode: APIStatus.Ok,
        total: 1,
      };
      return response;
    } catch (error) {
      throw new HttpException(
        error?.message || null,
        error?.status || APIStatus.ServerError,
      );
    }
  }

  async query<T>(
    dataSource: DataSource,
    entity: EntityTarget<T>,
    where: FindManyOptions<T>,
    paginate: IPaginate,
  ): Promise<IResponse<T[]> | null> {
    try {
      const repo = dataSource.getRepository(entity);
      const { offset, limit } = paginate;
      const [records, total] = await repo.findAndCount({
        ...where,
        skip: (offset - 1) * limit,
        take: limit,
      });

      if (!records) {
        return {
          statusCode: APIStatus.NotFound,
          total: 0,
        };
      }

      const response: IResponse<T[]> = {
        data: records,
        statusCode: APIStatus.Ok,
        total,
      };
      return response;
    } catch (error) {
      throw new HttpException(
        error?.message || null,
        error?.status || APIStatus.ServerError,
      );
    }
  }
}
