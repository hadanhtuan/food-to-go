import { PostgreRepository } from "@libs/core/databases/postgre";
import { LoggerService } from "@libs/utils/module/logger";
import { Injectable } from "@nestjs/common";


@Injectable()
export class RestaurantService extends PostgreRepository {
  logger: LoggerService
  private readonly serviceName: string = RestaurantService.name

  constructor() {
    @InjectDataSource(DbName.Postgres)
    private readonly dataSourcePostgres: DataSource,
  }
  
}