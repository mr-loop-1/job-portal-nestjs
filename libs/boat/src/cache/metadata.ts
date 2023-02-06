import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CacheOptions } from './interfaces';

@Injectable()
export class CacheMetadata {
  private static data: CacheOptions;

  constructor(private config: ConfigService) {
    CacheMetadata.data = config.get('cache');
  }

  static getData(): CacheOptions {
    return CacheMetadata.data;
  }
}
