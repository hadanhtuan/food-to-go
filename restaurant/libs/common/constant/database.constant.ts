import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConfig, DbName } from '../enum';

export const dbConfigMapping: Partial<Record<DbName, DbConfig>> = {
  [DbName.Postgres]: DbConfig.Postgres,
  // [DbName.Mongo]: DbConfig.Mongo,
};

export const dbModuleMapping = {
  [DbName.Postgres]: TypeOrmModule,
  // [DbName.Mongo]: MongooseModule,
};
