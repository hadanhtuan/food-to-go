import { dbModuleMapping } from '@libs/common/constant';
import { EDbConfig, EDbName } from '@libs/common/enum';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

type options = {
  dbConfigMapping: Partial<Record<EDbName, EDbConfig>>;
  getConfig: (cf: EDbConfig) => (a: ConfigService) => any;
};

@Module({})
export class DatabaseModule {
  static register(options: options): DynamicModule[] {
    const modules = [];

    for (const database in options.dbConfigMapping) {
      const orm = dbModuleMapping[database];
      const config = options.dbConfigMapping[database];

      let identityName = 'connectionName';
      if (orm === TypeOrmModule) identityName = 'name';

      modules.push(
        orm.forRootAsync({
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
