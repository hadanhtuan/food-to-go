import { Exclude, Expose } from 'class-transformer';

export type NonNullableType<T> = T extends null | undefined ? never : T;

@Exclude()
export class RedisCachePayload<T> {
  @Expose()
  data: NonNullableType<T>;
}
