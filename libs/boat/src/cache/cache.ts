import { ExpParser } from '../utils';
import { CacheDriver } from './interfaces';
import { CacheMetadata } from './metadata';
import { CacheService } from './service';

export class CacheKey {
  static fromObj(obj: Record<string, any>): string {
    return ExpParser.buildFromObj(obj);
  }
}

export class Cache {
  static store(store?: string): CacheDriver {
    const options = CacheMetadata.getData();
    return CacheService.stores[store || options.default];
  }
}

export function CacheStore(store?: string): CacheDriver {
  const options = CacheMetadata.getData();
  return CacheService.stores[store || options.default];
}
