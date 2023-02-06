import { Injectable } from '@nestjs/common';

import { StorageService } from './service';
const urlLib = require('url');

@Injectable()
export class Storage {
  static disk(disk: string) {
    return StorageService.getDriver(disk);
  }

  static generateSignedUrl(key: string, disk: string = 'docs') {
    if (!key) return null;
    const imgKey = `img_originals/${key}`;
    return StorageService.getDriver(disk).signedUrl(key, 4320);
  }

  static generatePublicUrl(key: string, disk: string = 'properties') {
    return StorageService.getDriver(disk).url(key);
  }
}
