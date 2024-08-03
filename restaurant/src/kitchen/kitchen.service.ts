import { DbName } from '@libs/common/enum/database.enum';
import { PostgreRepository } from '@libs/core/database/postgre';
import { LoggerService } from '@libs/utils/module/logger';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class KitchenService extends PostgreRepository {
  logger: LoggerService;
  private readonly serviceName: string = KitchenService.name;

  constructor(
    @InjectDataSource(DbName.Postgre)
    private readonly dataSource: DataSource,
    logger: LoggerService,
  ) {
    super();
    this.logger = logger;
    this.logger.setContext(this.serviceName);
  }
}
