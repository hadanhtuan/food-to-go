import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConfig, DbName } from '@libs/common/enum';
import { dbConfigMapping, dbModuleMapping } from '@libs/common/constant';

type options = {
  getConfig: (cf: DbConfig) => (a: ConfigService) => any;
};

@Module({})
export class DatabaseModule {
  static register(options: options): DynamicModule[] {
    const modules = [];

    for (const database in dbConfigMapping) {
      const ormModule = dbModuleMapping[database];
      const config = dbConfigMapping[database];

      let identityName = 'connectionName';
      if (ormModule === TypeOrmModule) identityName = 'name';

      modules.push(
        ormModule.forRootAsync({
          [identityName]: database,
          useFactory: options.getConfig(config),
          inject: [ConfigService],
        }),
      );
    }

    if (modules.length <= 0) console.info('Empty import ORM modules !!!');

    return modules;
  }
}
