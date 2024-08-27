import { Injectable, NotFoundException } from '@nestjs/common';
import { RPCService } from '@libs/core/module/communicate';
import { getErrorResponse } from '@libs/utils';
import { IResponse } from '@libs/common/interface/response';
import { EServiceName } from '@libs/common/enum';

@Injectable()
export class RestaurantService {
  constructor() {}

  async getRestaurant(): Promise<IResponse> {
    try {
      const res = await RPCService.sendRequest(
        EServiceName.RestaurantService,
        { test: 123 },
        'restaurant',
      );

      console.log(res);
      throw new NotFoundException('not found anything');
      return res;
    } catch (error) {
      return getErrorResponse(error);
    }
  }
}
