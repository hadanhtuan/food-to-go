import { Controller, Post } from '@nestjs/common';
import { KitchenService } from './kitchen.service';

@Controller('kitchen')
export class KitchenController {
  constructor(private readonly handoverService: KitchenService) {}

  @Post('get')
  getRestaurant() {}
}
