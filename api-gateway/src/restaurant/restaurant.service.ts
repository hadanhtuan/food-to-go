import { BadRequestException, Injectable } from '@nestjs/common';
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
        'restaurant',
        { test: 123 },
      );

      return res;
    } catch (error) {
      return getErrorResponse(error);
    }
  }
}
