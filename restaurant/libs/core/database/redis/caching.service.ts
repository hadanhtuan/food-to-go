import { Inject, Injectable } from '@nestjs/common';
import { REDIS_CACHE_CLIENT } from '@libs/common/constant';
import { RedisClient } from './caching.module';
import { NonNullableType, RedisCachePayload } from '@libs/common/type';
import { validate } from 'class-validator';
import { instanceToPlain } from 'class-transformer';
import { LoggerService } from '@libs/core/module/logger';

@Injectable()
export class CacheService {
  private callingMaps: Map<string, Promise<unknown>> = new Map();

  constructor(
    @Inject(REDIS_CACHE_CLIENT)
    private readonly redisClient: RedisClient,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext(CacheService.name);
  }

  async set<T>(
    key: string,
    payload: NonNullableType<T>,
    ttl: number,
  ): Promise<void> {
    const cachePayload = new RedisCachePayload();
    cachePayload.data = payload;
    const isValid = await validate(cachePayload);

    if (isValid.length) {
      // throw new Error(ERROR_MESSAGE.INSTANCE_VALIDATION_FAILED);
    }
    const plain = instanceToPlain(cachePayload, {
      exposeDefaultValues: true,
    });

    const result = await this.redisClient.setex(
      key,
      ttl,
      JSON.stringify(plain),
    );
  }

  async get<T>(key: string, immediateDelete: boolean = false): Promise<T> {
    const getter = immediateDelete
      ? this.redisClient.getdel.bind(this.redisClient)
      : this.redisClient.get.bind(this.redisClient);

    const rawData: string = await getter(key);
    const recordData: RedisCachePayload<T> = JSON.parse(rawData);
    return recordData.data;
  }

  async exists(key: string): Promise<boolean> {
    const isExists = await this.redisClient.exists([key]);
    return isExists > 0;
  }

  async delete(keys: Array<string>): Promise<number> {
    return this.redisClient.del(keys);
  }

  async deleteWithPrefix(prefix: string): Promise<number> {
    const keysDelete = await this.redisClient.keys(`${prefix}*`);
    let result = 0;
    if (keysDelete.length > 0) {
      result = await this.redisClient.del(keysDelete);
    }

    return result;
  }

  async increase(
    key: string,
    increaseBy = 1,
    willExpired: boolean = true,
    ttl: number = 86400,
  ): Promise<number> {
    const result = await this.redisClient.incrby(key, increaseBy);

    if (willExpired && result === increaseBy) {
      await this.redisClient.expire(key, ttl);
    }

    return result;
  }

  async decrease(
    key: string,
    decreaseBy = 1,
    willExpired: boolean = true,
    ttl: number = 86400,
  ): Promise<number> {
    const result = await this.redisClient.decrby(key, decreaseBy);

    if (willExpired && result === -decreaseBy) {
      await this.redisClient.expire(key, ttl);
    }

    return result;
  }
}
