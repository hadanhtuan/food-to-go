export const config = {
  rootApi: 'api',
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
      type: process.env.DB_TYPE || 'postgres',
      synchronize: false,
      logging: process.env.ENV !== 'develop' ? true : false,
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || 5432,
      username: process.env.DB_USER || 'username',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB || 'admin',
      extra: {
        connectionLimit: 10,
      },
      autoLoadEntities: true,
    },
    mongodb: {
      uri: `mongodb://${process.env.DB_MONGO_USER || 'root'}:${
        process.env.DB_MONGO_PASSWORD || 'password'
      }@${process.env.DB_MONGO_HOST || 'localhost'}:${
        process.env.DB_MONGO_PORT || 27017
      }?directConnection=true`,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    mysql: {
      type: process.env.DB_MYSQL_TYPE || 'mysql',
      synchronize: false,
      logging: process.env.ENV !== 'develop' ? true : false,
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
      socket: {
        port: process.env.REDIS_PORT || 6379,
        host: process.env.REDIS_HOST || '127.0.0.1',
      },
    },
  },
  jwt: {
    jwtSecretExpirePeriod: process.env.JWT_SECRET_EXPIRE_PERIOD || 1,
    jwtSecretExpireDigit: process.env.JWT_SECRET_EXPIRE_DIGIT || 'day',
    jwtRefreshSecretExpirePeriod:
      process.env.JWT_REFRESH_SECRET_EXPIRE_PERIOD || 7,
    jwtRefreshSecretExpireDigit:
      process.env.JWT_REFRESH_SECRET_EXPIRE_DIGIT || 'day',
  },
  services: {
    apiGateway: {
      port: process.env.API_GATEWAY_PORT || 3000,
    },
    orderService: {
      transport: 0,
      options: {
        host: process.env.ORDER_HOST || '0.0.0.0',
        port: process.env.ORDER_PORT || 4000,
      },
    },
    deliveryService: {
      transport: 0,
      options: {
        host: process.env.DELIVERY_HOST || '0.0.0.0',
        port: process.env.DELIVERY_PORT || 4001,
      },
    },
  },
};
