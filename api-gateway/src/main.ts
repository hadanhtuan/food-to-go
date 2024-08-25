import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  TimeoutInterceptor,
  ResponseInterceptor,
} from '@libs/core/middeware/interceptor';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { errorFormatter } from '@libs/utils';
import { GatewayExceptionFilter } from '@libs/core/middeware/filter';
import { configuration } from '@libs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    allowedHeaders: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  // interceptor
  app.useGlobalInterceptors(
    new TimeoutInterceptor(),
    new ResponseInterceptor(),
  );

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

  // filter
  app.useGlobalFilters(new GatewayExceptionFilter());

  await app.listen(configuration.serverPort);
}

bootstrap();
