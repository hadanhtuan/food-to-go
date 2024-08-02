import { Controller, Post } from '@nestjs/common';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: R) {}


  @Post('get')
  getRestaurant() {

  }
}
