import { APIStatus } from '@libs/common/enums/api-status.enum';
import { IBaseRepository } from '@libs/common/interfaces/postgre';
import { IPaginate } from '@libs/common/interfaces/request';
import { IResponse } from '@libs/common/interfaces/response';
import { HttpException } from '@nestjs/common';
import {
  DataSource,
  EntityTarget,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class PostgreRepository implements IBaseRepository {
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
        status: APIStatus.Created,
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

      await repo.update(where, payload)

      const response: IResponse<T> = {
        status: APIStatus.Ok,
        total: 1,
      };
    
      return response;
    } catch (error) {
      throw new HttpException(
        error?.message || null,
        error?.status || APIStatus.ServerError,
      );
    }  }

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
          status: APIStatus.NotFound,
          total: 0,
        } as IResponse<T>;
      }

      const response: IResponse<T> = {
        data: record,
        status: APIStatus.Ok,
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
          status: APIStatus.NotFound,
          total: 0,
        } as IResponse<T[]>;
      }

      const response: IResponse<T[]> = {
        data: records,
        status: APIStatus.Ok,
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
