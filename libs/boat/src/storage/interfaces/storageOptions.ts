import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

export interface DiskOptions {
  driver: 's3' | 'local';
  profile?: string;
  region?: string;
  bucket?: string;
  prefix?: string;
  basePath?: string;
}

export interface StorageOptions {
  default?: string;
  disks: Record<string, DiskOptions>;
}

export interface StorageOptionsFactory {
  createStorageOptions(): Promise<StorageOptions> | StorageOptions;
}

export interface StorageAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useExisting?: Type<StorageOptions>;
  useClass?: Type<StorageOptions>;
  useFactory?: (...args: any[]) => Promise<StorageOptions> | StorageOptions;
  inject?: any[];
}

export interface GDriveOptions {
  driver?: string;
  clientEmail?: string;
  privateKey?: string;
  scope?: string[];
}
