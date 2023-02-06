import { GenericFunction, Package } from '@libs/boat';
import { CacheDriver, RedisDriverOption } from '../interfaces';

export class RedisDriver implements CacheDriver {
  public client: any;
  private cacheTags: string[];
  private ignoreKeyPrefix: boolean;

  constructor(private options: RedisDriverOption) {
    const IORedis = Package.load('ioredis');
    this.client = new IORedis({
      host: options.host,
      port: options.port,
      password: options.password,
      db: options.database,
    });
    this.ignoreKeyPrefix = false;
    this.cacheTags = [];
  }

  async keys(prefix: string): Promise<string[]> {
    return this.client.keys(prefix);
  }

  async get(key: string): Promise<any> {
    const value = await this.client.get(this.storeKey(key));
    if (!value) return null;
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }

  async set(
    key: string,
    value: string | Record<string, any>,
    ttlInSec?: number,
  ): Promise<void> {
    const redisKey = this.storeKey(key);
    if (ttlInSec) {
      await this.client.set(redisKey, JSON.stringify(value), 'EX', ttlInSec);
    }

    await this.client.set(redisKey, JSON.stringify(value));

    await this.syncTags(redisKey);
    this.cacheTags = [];
  }

  async syncTags(redisKey: string): Promise<void> {
    const key = `${redisKey}:::tagged-data`;
    const previousTags = await this.client.smembers(key);

    // find difference between new tags and previous tags
    const toBeDeletedTags = [];
    for (const tag of previousTags) {
      if (!this.cacheTags.includes(tag)) {
        toBeDeletedTags.push(tag);
      }
    }

    if (toBeDeletedTags.length == 0) return;

    if (toBeDeletedTags) {
      const promises = [];
      for (const tag of toBeDeletedTags) {
        promises.push(this.client.srem(`tag:::${tag}`, redisKey));
      }

      promises.length && (await Promise.all(promises));
    }

    await this.client.del(key);
    if (this.cacheTags.length) {
      const promises = [];
      promises.push(this.client.sadd(key, this.cacheTags));

      for (const tag of this.cacheTags) {
        promises.push(this.client.sadd(`tag:::${tag}`, redisKey));
      }

      promises.length && (await Promise.all(promises));
    }
  }

  async has(key: string): Promise<boolean> {
    const num = await this.client.exists(this.storeKey(key));
    return !!num;
  }

  async remember<T>(
    key: string,
    cb: GenericFunction,
    ttlInSec: number,
  ): Promise<T> {
    if (await this.has(key)) return this.get(key);

    const response = await cb();
    await this.set(key, response, ttlInSec);
    return response;
  }

  async rememberForever<T>(key: string, cb: GenericFunction): Promise<T> {
    if (await this.has(key)) return this.get(key);

    const response = await cb();
    await this.set(key, response);
    return response;
  }

  async forget(key?: string): Promise<void> {
    if (this.cacheTags.length === 0 && !key) {
      throw new Error('You need to send key if you are not passing tags');
    }

    await this.client.del(this.storeKey(key));
  }

  private storeKey(key: string): string {
    return this.ignoreKeyPrefix ? key : `${this.options.prefix}:::${key}`;
  }

  getClient<T>(): T {
    return this.client;
  }

  tags(...keys: string[]): CacheDriver {
    this.cacheTags = keys;
    return this;
  }

  ignorePrefix(): CacheDriver {
    this.ignoreKeyPrefix = true;
    return this;
  }
}
