import { RedisQueueDriver } from '@squareboat/nest-queue-redis';
import { registerAs } from '@nestjs/config';
import { QueueOptions } from '@libs/boat/queue';
export default registerAs('queue', () => {
  return {
    default: 'notifications',
    connections: {
        notifications: {
        driver: RedisQueueDriver,
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: +process.env.REDIS_PORT || 6379,
        database: +process.env.REDIS_DB || 0,
        queue: 'fp-jobs-queue',
      },
    },
  } as QueueOptions;
});






