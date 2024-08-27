import process from 'node:process';
import { ConfigService } from '@nestjs/config';

export type TOrm = {
  type: string;
  synchronize: boolean;
  logging: boolean;
  host: string;
  port: string | number;
  username: string;
  password: string;
  database: string;
  extra: {
    connectionLimit: number;
  };
  autoLoadEntities: true;
};

export type TEnv = string | 'dev' | 'stg' | 'uat' | 'prd';

export type TService = {
  transport: number;
  options: {
    host: string;
    port: string | number;
  };
};

export type TConfiguration = {
  env: TEnv;
  serverPort: number;
  rootApi: string;
  requestLimit: {
    time: string | number;
    limit: string | number;
  };
  aws: {
    config: {
      region: string;
      accessKeyId: string;
      secretAccessKey: string;
    };
  };
  db: {
    postgres: TOrm;
    mysql: TOrm;
    mongo: {
      uri: string;
      useNewUrlParser: true;
      useUnifiedTopology: true;
    };
    redis: {
      password: string;
      host: string;
      port: number;
    };
  };
  // jwt: {
  //   jwtSecretExpirePeriod: number,
  //   jwtRefreshSecretExpirePeriod: number,
  // }
  services: {
    apiGateway: TService;
    orderService: TService;
    deliveryService: TService;
    restaurantService: TService;
  };
};

export type TConfigService = ConfigService<TConfiguration>;
