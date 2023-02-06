import { registerAs } from '@nestjs/config';
import { CacheOptions } from '@libs/boat/cache';
export default registerAs(
  'cache',
  () =>
    ({
      default: 'redis',
      stores: {
        redis: {
          driver: 'redis',
          host: process.env.REDIS_HOST || '127.0.0.1',
          password: process.env.REDIS_PASSWORD || null,
          port: process.env.REDIS_PORT || 6379,
          database: process.env.REDIS_DB || 0,
          prefix: process.env.REDIS_PREFIX || 'boat_',
        },
      },
    } as CacheOptions),
);




