import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfig {
  static client: ConfigService;

  constructor(config: ConfigService) {
    AppConfig.client = config;
  }

  static get<T = any>(key: string): T {
    return AppConfig.client.get(key);
  }
}
