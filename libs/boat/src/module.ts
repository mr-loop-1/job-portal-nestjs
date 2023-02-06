import { Global, Module } from '@nestjs/common';
import config from '@config/index';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DiscoveryModule } from '@nestjs/core';
import { BaseValidator, IsValueFromConfigConstraint } from './validator';
import { EventExplorer } from './events';
import { EventQueueWorker } from './events/queue';
import { StorageService } from './storage';
import { QueueConsoleCommands, QueueExplorer, QueueMetadata, QueueService } from './queue';
import { AppConfig } from './utils';
import { ConsoleExplorer, ListCommands } from './console';
import { CacheMetadata, CacheService, CacheCommands } from './cache';
import { ObjectionModule } from '@libs/database';
import pg from 'pg';
import { JwtModule } from '@nestjs/jwt';

pg.types.setTypeParser(20, (val) => parseInt(val));
@Global()
@Module({
  imports: [
    DiscoveryModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: config,
    }),
    ObjectionModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('db'),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AppConfig,
    BaseValidator,
    CacheService,
    CacheMetadata,
    CacheCommands,
    ConsoleExplorer,
    EventExplorer,
    EventQueueWorker,
    IsValueFromConfigConstraint,
    ListCommands,
    StorageService,
    QueueExplorer,
    QueueService,
    QueueMetadata,
    QueueConsoleCommands,
  ],
  exports: [BaseValidator],
})
export class BoatModule {}
