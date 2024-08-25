import { Controller, Post } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { IResponse } from '@libs/common/interface/response';
import { APIStatus } from '@libs/common/enum';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post('get')
  getRestaurant(): IResponse {
    return {
      data: 'test',
      status: APIStatus.Ok,
    };
  }
}
