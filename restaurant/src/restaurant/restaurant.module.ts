import { DbName } from '@libs/common/enum';
import {
  getEntitiesPostgres,
  mapEntities,
} from '@libs/utils/helper/database.helper';
import { LoggerModule } from '@libs/utils/module/logger';
import { Module } from '@nestjs/common';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';

const entities = {
  [DbName.Postgre]: getEntitiesPostgres(),
};

@Module({
  imports: [LoggerModule, ...mapEntities(entities)],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {}
