import { Module } from '@nestjs/common';
import { RestaurantModule } from './restaurant';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getConfig } from '@libs/config';
import { DatabaseModule } from '@libs/utils/module/orm';
import { dbConfigMapping } from '@libs/common/constant';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [getConfig],
      isGlobal: true,
    }),
    ...DatabaseModule.register({
      dbConfigMapping,
      getConfig: (cf) => (configService: ConfigService) => {
        const schemaDbConfig = configService.get(cf);
        return Object.assign(
          {},
          schemaDbConfig,
          schemaDbConfig?.replication?.master,
        );
      },
    }),
    RestaurantModule]
})
export class MainModule {}
