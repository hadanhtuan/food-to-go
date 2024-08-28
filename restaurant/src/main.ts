import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { configuration } from '@libs/config';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { errorFormatter } from '@libs/utils';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MainModule,
    configuration.services.restaurantService,
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const message = errorFormatter(errors);
        return new BadRequestException([message]);
      },
    }),
  );

  // cannot apply filter for rpc request, need to try catch in each controller/service
  // app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen();
}

bootstrap();
