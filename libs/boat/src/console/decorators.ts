import 'reflect-metadata';
import { BoatConstants } from '../constants';
import { CommandOptions } from './interfaces';

/**
 * Command decorator function to add a new command to CommandMeta class
 * @param command string
 * @param options Record<string, any>
 */
export function Command(command: string, options?: CommandOptions) {
  options = options || ({} as CommandOptions);
  return function (...args: string[] | any[]) {
    switch (args.length) {
      case 1:
        Reflect.defineMetadata(BoatConstants.commandName, command, args[0]);
        Reflect.defineMetadata(BoatConstants.commandOptions, options, args[0]);
        break;

      case 3:
        Reflect.defineMetadata(
          BoatConstants.commandName,
          command,
          args[0],
          args[1],
        );
        Reflect.defineMetadata(
          BoatConstants.commandOptions,
          options,
          args[0],
          args[1],
        );
        break;
    }
  };
}
