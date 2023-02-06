import * as pc from 'picocolors';
import { CommandObject } from './interfaces';
import { ConsoleIO } from './consoleIO';
import { Logger } from './logger';
import yargsParser = require('yargs-parser');
import { CommandMeta } from './metadata';

export class CommandRunner {
  static async run(cmd: string): Promise<void> {
    const argv = yargsParser(cmd);
    const command = CommandMeta.getCommand(argv._[0].toString());
    await CommandRunner.handle(command, argv);
  }

  static async handle(
    command: CommandObject,
    args: Record<string, any>,
  ): Promise<void> {
    if (args.options) {
      CommandRunner.printOptions(command);
      return;
    }

    const _cli = ConsoleIO.from(command.expression, args);
    if (_cli.hasErrors && _cli.missingArguments.length > 0) {
      _cli.error(` Missing Arguments: ${_cli.missingArguments.join(', ')} `);
      return;
    }

    await command.target(_cli);
    return;
  }

  static printOptions(command: Record<string, any>) {
    const options = command.options.args || {};
    const commandOptions = [];
    for (const key in options) {
      commandOptions.push({
        name: key,
        description: options[key].desc,
        required: options[key].req ? 'Y' : '',
      });
    }

    Logger.info(pc.bgBlue(pc.white(pc.bold(' Options '))));

    if (commandOptions.length) {
      Logger.table(commandOptions);
    } else {
      Logger.info('No option found for specified command');
    }
  }
}
