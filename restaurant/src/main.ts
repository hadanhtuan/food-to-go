import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { TimeoutInterceptor } from '@libs/core/middeware/interceptor';
import { MicroserviceOptions } from '@nestjs/microservices';
import { configuration } from '@libs/config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MainModule,
    configuration.services.restaurantService,
  );

  app.useGlobalInterceptors(new TimeoutInterceptor());

  // app.useGlobalFilters(new AllExceptionsFilter(app));

  await app.listen();
}

bootstrap();
