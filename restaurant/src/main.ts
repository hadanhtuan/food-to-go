import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { ConfigService } from '@nestjs/config';
import { ResponseInterceptor } from '@libs/utils/middeware/interceptor/response.interceptor';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  const configService = app.get(ConfigService);

  const config = configService.get('services.restaurantService');

  app.useGlobalInterceptors(new ResponseInterceptor())
  app.init()
  app.connectMicroservice<MicroserviceOptions>(config)
  app.startAllMicroservices()
}
bootstrap();
