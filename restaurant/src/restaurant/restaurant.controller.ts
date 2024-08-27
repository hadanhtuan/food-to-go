import { BadRequestException, Controller } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { IResponse } from '@libs/common/interface/response';
import { MessagePattern } from '@nestjs/microservices';
import { APIStatus } from '@libs/common/enum';
import { getErrorResponse } from '@libs/utils';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  // @UseFilters(ResponseExceptionFilter)
  @MessagePattern({ cmd: 'restaurant' })
  getRestaurant(): IResponse {
    try {
      throw new BadRequestException('mother fucker');
      // return {
      //   data: 'test',
      //   status: APIStatus.Ok,
      // };
    } catch (error) {
      return getErrorResponse(error);
    }
  }
}
