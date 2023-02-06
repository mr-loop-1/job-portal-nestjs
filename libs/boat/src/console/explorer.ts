import { Injectable } from '@nestjs/common';
import { DiscoveryService, MetadataScanner } from '@nestjs/core';
import { BoatConstants, GenericFunction } from '../constants';
import { CommandMeta } from './metadata';

@Injectable()
export class ConsoleExplorer {
  constructor(
    private readonly discovery: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
  ) {}

  onModuleInit() {
    const wrappers = this.discovery.getProviders();
    wrappers.forEach((w) => {
      const { instance } = w;
      if (
        !instance ||
        typeof instance === 'string' ||
        !Object.getPrototypeOf(instance)
      ) {
        return;
      }

      this.metadataScanner.scanFromPrototype(
        instance,
        Object.getPrototypeOf(instance),
        (key: string) => this.lookupConsoleCommands(instance, key),
      );
    });
  }

  lookupConsoleCommands(
    instance: Record<string, GenericFunction>,
    key: string,
  ) {
    const methodRef = instance[key];
    const hasCommandMeta = Reflect.hasMetadata(
      BoatConstants.commandName,
      instance,
      key,
    );
    const isClassConsoleCommand = Reflect.hasMetadata(
      BoatConstants.commandName,
      instance.constructor,
    );

    if (!hasCommandMeta && !isClassConsoleCommand) return;

    if (isClassConsoleCommand && key != 'handle') return;

    const command =
      Reflect.getMetadata(BoatConstants.commandName, instance, key) ||
      Reflect.getMetadata(BoatConstants.commandName, instance.constructor);

    const options =
      Reflect.getMetadata(BoatConstants.commandOptions, instance, key) ||
      Reflect.getMetadata(BoatConstants.commandOptions, instance.constructor);

    CommandMeta.setCommand(command, methodRef.bind(instance), options);
  }
}
