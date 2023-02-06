import { Injectable } from '@nestjs/common';
import { Command, ConsoleIO } from '../console';
import { Cache } from './cache';

@Injectable()
export class CacheCommands {
  @Command('cache:ls {--store=} {--prefix=*}', {
    desc: 'Command to list all the keys',
  })
  async listPrefixes(cli: ConsoleIO): Promise<void> {
    const store = cli.option<string>('store') || '';
    const keys = await Cache.store(store).keys(cli.option('prefix'));
    for (const key of keys) {
      cli.info(key);
    }
  }

  @Command('cache:flush {--store=} {--prefix=*}', {
    desc: 'Command to flush all the keys',
  })
  async flushCache(cli: ConsoleIO): Promise<void> {
    const store = cli.option<string>('store') || '';
    const keys = await Cache.store(store).keys(cli.option('prefix'));
    if (keys.length == 0) {
      cli.error(` No keys to delete `);
      return;
    }
    cli.error(` Deleting following keys `);
    for (const key of keys) {
      cli.info(key);
      await Cache.store(store).ignorePrefix().forget(key);
    }
  }
}
