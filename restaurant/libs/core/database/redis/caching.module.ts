import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheService } from './caching.service';
import { LoggerModule } from '@libs/core/module/logger';
import Redis from 'ioredis';
import { configuration } from '@libs/config';
import { REDIS_CACHE_CLIENT } from '@libs/common/constant';

export type RedisClient = Redis;

@Global()
@Module({
  imports: [LoggerModule, ConfigModule],
  providers: [
    {
      useFactory: (): RedisClient => {
        const redisConfig = configuration.db.redis;
        return new Redis({
          host: redisConfig.host,
          port: redisConfig.port,
          password: redisConfig.password,
        });
      },
      provide: REDIS_CACHE_CLIENT,
    },
  ],
  exports: [CacheService],
})
export class CacheModule {}
