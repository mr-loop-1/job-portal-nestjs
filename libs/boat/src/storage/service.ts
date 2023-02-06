import { Injectable } from '@nestjs/common';
import { StorageOptions } from './interfaces';
import { StorageDriver } from './interfaces';
import { DriverManager } from './driverManager';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StorageService {
  private static diskDrivers: { [key: string]: any };
  private static options: StorageOptions;
  private static driverManager: DriverManager;

  constructor(private config: ConfigService) {
    StorageService.options = config.get('storage');
    StorageService.diskDrivers = {};
    StorageService.driverManager = new DriverManager();
  }

  static getDriver(disk: string): StorageDriver {
    if (StorageService.diskDrivers[disk]) {
      return StorageService.diskDrivers[disk];
    }
    const driver = StorageService.newDriver(disk);
    StorageService.diskDrivers[disk] = driver;
    return driver;
  }

  static newDriver(disk: string): StorageDriver {
    return StorageService.driverManager.getDriver(
      disk,
      StorageService.options.disks[disk],
    );
  }
}
