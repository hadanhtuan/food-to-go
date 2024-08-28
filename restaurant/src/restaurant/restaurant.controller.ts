import { Controller } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { IResponse } from '@libs/common/interface/response';
import { MessagePattern } from '@nestjs/microservices';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @MessagePattern({ cmd: 'restaurant' })
  async getRestaurant(): Promise<IResponse> {
    return this.restaurantService.getRestaurant();
  }
}
