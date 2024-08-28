import { BadRequestException, Controller, Post } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { IResponse } from '@libs/common/interface/response';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Post()
  async getDeliveries(): Promise<IResponse> {
    return this.deliveryService.getDeliveries();
  }
}
