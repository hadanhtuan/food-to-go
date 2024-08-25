import {TimeoutInterceptor} from '@libs/utils/middeware/interceptor';
import {ResponseInterceptor} from '@libs/utils/middeware/interceptor/response.interceptor';
import {ConfigService} from '@nestjs/config';
import {NestFactory} from '@nestjs/core';
import {MainModule} from './main.module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  const configService = app.get(ConfigService);

  const config = configService.get('services.restaurantService');

  app.enableCors({
    origin: '*',
    allowedHeaders: '*',
    methods: ['GET', 'POST', 'DELETE'],
  });

  app.useGlobalInterceptors(
    new ResponseInterceptor(),
    new TimeoutInterceptor(),
  );
  // app.init();
  // app.connectMicroservice<MicroserviceOptions>(config);
  // app.startAllMicroservices();
  await app.listen(config.options.port)
}
bootstrap();
