import { ModuleMetadata, Type } from "@nestjs/common";
import { Knex } from "knex";

export interface DatabaseOptions {
  isGlobal?: boolean;
  default: string;
  connections: Record<string, Knex.Config>;
}

export interface DatabaseAsyncOptions extends Pick<ModuleMetadata, "imports"> {
  name?: string;
  isGlobal: boolean;
  useExisting?: Type<DatabaseOptions>;
  useClass?: Type<DatabaseAsyncOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<DatabaseOptions> | DatabaseOptions;
  inject?: any[];
}

export interface DatabaseAsyncOptionsFactory {
  createOptions(): Promise<DatabaseOptions> | DatabaseOptions;
}
