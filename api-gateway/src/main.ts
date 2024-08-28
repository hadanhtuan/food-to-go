import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GatewayResponseInterceptor } from '@libs/core/middeware/interceptor';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { errorFormatter } from '@libs/utils';
import { AllExceptionsFilter, StatusFilter } from '@libs/core/middeware/filter';
import { configuration } from '@libs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    allowedHeaders: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  // interceptor
  app.useGlobalInterceptors(new GatewayResponseInterceptor());

  // pipe
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

  // filter => still bug, define on each controller
  app.useGlobalFilters(new AllExceptionsFilter(app));
  app.useGlobalFilters(new StatusFilter());

  await app.listen(configuration.serverPort);
}

bootstrap();
