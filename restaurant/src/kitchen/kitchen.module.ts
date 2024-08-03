import { Global, Module } from '@nestjs/common';
import { KitchenController } from './kitchen.controller';
import { KitchenService } from './kitchen.service';
import { LoggerModule } from '@libs/utils/module/logger';

@Module({
  imports: [LoggerModule, ],
  controllers: [KitchenController],
  providers: [KitchenService],
})
export class KitchenModule {}
