import { Injectable } from '@nestjs/common';
import * as pc from 'picocolors';
import { ObjectionService } from '../service';
import { ConsoleIO, Command } from '@libs/boat/console';

@Injectable()
export class DbOperationsCommand {
  private migratorConfig = {
    directory: './database/migrations',
    loadExtensions: ['.js'],
  };

  constructor() {}

  @Command('migrate:status', {
    desc: 'Command to show the status of all migrations',
  })
  async migrateStatus(_cli: ConsoleIO): Promise<void> {
    const knex = ObjectionService.connection();
    const [completed, pending]: Record<string, any>[][] =
      await knex.migrate.list(this.migratorConfig);
    const statusList = [];

    for (const migration of completed) {
      statusList.push({ migration: migration.name, status: pc.green('Y') });
    }

    for (const migration of pending) {
      statusList.push({ migration: migration.file, status: pc.red('N') });
    }

    _cli.table(statusList);
  }

  @Command('migrate', { desc: 'Command to run the pending migrations' })
  async migrationUp(_cli: ConsoleIO): Promise<void> {
    const knex = ObjectionService.connection();
    const [batch, migrations]: [number, string[]] = await knex.migrate.latest(
      this.migratorConfig,
    );

    if (migrations.length === 0) {
      _cli.info('No migrations to run');
      return;
    }

    _cli.info(`Batch Number: ${batch}`);
    for (const migration of migrations) {
      _cli.success(migration);
    }
  }

  @Command('migrate:rollback', {
    desc: 'Command to rollback the previous batch of migrations',
  })
  async migrateRollback(_cli: ConsoleIO) {
    const knex = ObjectionService.connection();
    const [batch, migrations]: [number, string[]] = await knex.migrate.rollback(
      this.migratorConfig,
    );

    if (migrations.length === 0) {
      _cli.info('No migrations to rollback. Already at the base migration');
      return;
    }

    _cli.info(`Reverted Batch: ${batch}`);
    for (const migration of migrations) {
      _cli.success(migration);
    }
  }

  @Command('migrate:reset', {
    desc: 'Command to reset the migration',
  })
  async migrateReset(_cli: ConsoleIO) {
    const knex = ObjectionService.connection();
    const confirm = await _cli.confirm(
      'Are you sure you want to reset your database? This action is irreversible.',
    );

    if (!confirm) {
      _cli.info('Thank you! Exiting...');
      return;
    }

    const password = await _cli.password(
      'Please enter the password of the database to proceed',
    );

    // if (password !== this.config.get("db.password")) {
    //   _cli.error(" Wrong Password. Exiting... ");
    //   return;
    // }

    const [, migrations]: [number, string[]] = await knex.migrate.down(
      this.migratorConfig,
    );

    if (migrations.length === 0) {
      _cli.info('No migrations to rollback. Already at the base migration');
      return;
    }

    _cli.info('Rollback of following migrations are done:');
    for (const migration of migrations) {
      _cli.success(migration);
    }
  }

  @Command('make:migration {name}', {
    desc: 'Command to create a new migration',
  })
  async makeMigration(_cli: ConsoleIO) {
    const knex = ObjectionService.connection();
    const res = await knex.migrate.make(_cli.argument('name'), {
      directory: this.migratorConfig.directory,
      extension: 'js',
    });

    const paths = res.split('/');
    _cli.success(paths[paths.length - 1]);
  }
}
