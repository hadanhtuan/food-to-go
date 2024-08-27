import { Module } from '@nestjs/common';
import { RestaurantModule } from './restaurant';
import { DatabaseModule } from '@libs/core/module/orm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { loadConfiguration } from '@libs/config';
import { AllExceptionsFilter } from '@libs/core/middeware/filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [loadConfiguration], // setup config for global use
      isGlobal: true,
    }),
    ...DatabaseModule.register({
      getConfig: (cf) => (configService: ConfigService) => {
        const schemaDbConfig = configService.get(cf);
        return Object.assign(
          {},
          schemaDbConfig,
          schemaDbConfig?.replication?.master,
        );
      },
    }),
    RestaurantModule,
  ],
  // another way for global filter catch exception
  // providers: [{ provide: APP_FILTER, useClass: AllExceptionsFilter }],
})
export class MainModule {}
