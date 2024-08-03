import { Controller, Post } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}


  @Post('get')
  getRestaurant() {
    
  }
}
