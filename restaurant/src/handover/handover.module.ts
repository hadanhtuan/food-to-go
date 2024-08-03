import { Global, Module } from '@nestjs/common';
import { HandoverController } from './handover.controller';
import { HandoverService } from './handover.service';
import { LoggerModule } from '@libs/utils/module/logger';

@Module({
  imports: [LoggerModule],
  controllers: [HandoverController],
  providers: [HandoverService],
})
export class HandoverModule {}
