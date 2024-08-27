import { DbName } from '@libs/common/enum/database.enum';
import { PostgresRepository } from '@libs/core/database/postgre';
import { LoggerService } from '@libs/core/module/logger';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

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
}
