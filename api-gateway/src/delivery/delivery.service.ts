import { BadRequestException, Injectable } from '@nestjs/common';
import { IResponse } from '@libs/common/interface/response';
import { getErrorResponse } from '@libs/utils';
import { configuration } from '@libs/config';
import { getRestUrl } from '@libs/utils/service.util';
import { EServiceName } from '@libs/common/enum';
import { RestService } from '@libs/core/module/communicate';

@Injectable()
export class DeliveryService {
  async getDeliveries(): Promise<IResponse> {
    try {
      const url = getRestUrl(EServiceName.DeliveryService, 'delivery');
      const res = await RestService.post(url, { test: 123 });
      return res;
    } catch (error) {
      return getErrorResponse(error);
    }
  }
}
