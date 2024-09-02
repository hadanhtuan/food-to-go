import { DbName } from '@libs/common/enum/database.enum';
import { PostgresRepository } from '@libs/core/database/postgre';
import { LoggerService } from '@libs/core/module/logger';
import {
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { IResponse } from '@libs/common/interface/response';
import { APIStatus } from '@libs/common/enum';
import { getErrorResponse } from '@libs/utils';

@Injectable()
export class RestaurantService extends PostgresRepository {
  logger: LoggerService;
  private readonly serviceName: string = RestaurantService.name;

  constructor(
    @InjectDataSource(DbName.Postgres)
    private readonly dataSource: DataSource,
    logger: LoggerService,
  ) {
    super();
    this.logger = logger;
    this.logger.setContext(this.serviceName);
  }

  async getRestaurant(): Promise<IResponse> {
    try {
      // await sleep(7000);
      throw new ServiceUnavailableException('bad request');
      return {
        data: [{ test: 123 }],
        message: 'Query restaurant successfully',
        statusCode: APIStatus.Created,
      };
    } catch (error) {
      return getErrorResponse(error);
    }
  }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
