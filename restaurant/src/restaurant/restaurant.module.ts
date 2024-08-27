import { DbName } from '@libs/common/enum';

import { LoggerModule } from '@libs/core/module/logger';
import { Module } from '@nestjs/common';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { getEntitiesPostgres, mapEntities } from '@libs/utils';

const entities = {
  [DbName.Postgres]: getEntitiesPostgres(),
};

@Module({
  imports: [LoggerModule, ...mapEntities(entities)],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {}
