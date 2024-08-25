import { TConfiguration, DeepReadonly } from '@libs/common/type';
import * as process from 'node:process';
import * as path from 'path';

require('dotenv').config({ path: path.join(process.cwd(), '.env') });

//there some bug in here, the env can change properties
export const configuration: DeepReadonly<TConfiguration> = {
  rootApi: 'api',
  env: process.env.ENV || 'dev',
  serverPort: 3000,
  requestLimit: {
    time: process.env.LIMIT_REQUEST_PER_SECOND || 60,
    limit: process.env.LIMIT_REQUEST || 100,
  },
  aws: {
    config: {
      region: process.env.AWS_REGION || 'AWS_REGION',
      accessKeyId: process.env.AWS_ACCESS_ID || 'AWS_ACCESS_ID',
      secretAccessKey: process.env.AWS_SECRET_KEY || 'AWS_SECRET_KEY',
    },
  },
  db: {
    postgres: {
      type: process.env.PG_TYPE || 'postgres',
      synchronize: false,
      logging: process.env.ENV !== 'develop',
      host: process.env.PG_HOST || '127.0.0.1',
      port: process.env.PG_PORT || 5432,
      username: process.env.PG_USER || 'username',
      password: process.env.PG_PWD || 'password',
      database: process.env.PG_NAME || 'admin',
      extra: {
        connectionLimit: 10,
      },
      autoLoadEntities: true,
    },
    mongo: {
      uri: process.env.DB_MONGO_URL || 'uri',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    mysql: {
      type: process.env.DB_MYSQL_TYPE || 'mysql',
      synchronize: false,
      logging: process.env.ENV !== 'develop',
      host: process.env.DB_MYSQL_HOST || '127.0.0.1',
      port: process.env.DB_MYSQL_PORT || 5432,
      username: process.env.DB_MYSQL_USER || 'username',
      password: process.env.DB_MYSQL_PASSWORD || 'password',
      database: process.env.DB_MYSQL || 'db',
      extra: {
        connectionLimit: 10,
      },
      autoLoadEntities: true,
    },
    redis: {
      password: process.env.REDIS_PWD || 'password',
      port: Number(process.env.REDIS_PORT) || 6379,
      host: process.env.REDIS_HOST || '127.0.0.1',
    },
  },
  services: {
    apiGateway: {
      transport: 0,
      options: {
        host: process.env.GATEWAY_PORT || '0.0.0.0',
        port: process.env.GATEWAY_PORT || 3000,
      },
    },
    orderService: {
      transport: 0,
      options: {
        host: process.env.ORDER_HOST || '0.0.0.0',
        port: process.env.ORDER_PORT || 4000,
      },
    },
    restaurantService: {
      transport: 0,
      options: {
        host: process.env.RESTAURANT_HOST || '0.0.0.0',
        port: process.env.RESTAURANT_PORT || 4001,
      },
    },
    deliveryService: {
      transport: 0,
      options: {
        host: process.env.DELIVERY_HOST || '0.0.0.0',
        port: process.env.DELIVERY_PORT || 4002,
      },
    },
  },
};
