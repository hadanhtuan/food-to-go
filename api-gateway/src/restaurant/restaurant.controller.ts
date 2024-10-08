import { Controller, Post } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { IResponse } from '@libs/common/interface/response';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  getRestaurant(): Promise<IResponse> {
    return this.restaurantService.getRestaurant();
  }
}
