import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConfig, DbName } from '../enum';

export const dbConfigMapping: Partial<Record<DbName, DbConfig>> = {
  [DbName.Postgre]: DbConfig.Postgre,
  // [DbName.Mongo]: DbConfig.Mongo,
};

export const dbModuleMapping = {
  [DbName.Postgre]: TypeOrmModule,
  // [DbName.Mongo]: MongooseModule,
};
