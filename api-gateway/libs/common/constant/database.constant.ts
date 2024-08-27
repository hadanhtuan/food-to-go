import { TypeOrmModule } from '@nestjs/typeorm';
import { EDbConfig, EDbName } from '../enum';

export const dbConfigMapping: Partial<Record<EDbName, EDbConfig>> = {
  [EDbName.Postgres]: EDbConfig.Postgres,
  // [DbName.Mongo]: DbConfig.Mongo,
};

export const dbModuleMapping = {
  [EDbName.Postgres]: TypeOrmModule,
  // [DbName.Mongo]: MongooseModule,
};
