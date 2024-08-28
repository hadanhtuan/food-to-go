import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { DeliveryModule } from './delivery/delivery.module';

@Module({
  imports: [OrderModule, RestaurantModule, DeliveryModule],
  providers: [],
})
export class AppModule {}
