import 'reflect-metadata';
import { BoatConstants, GenericClass } from '../constants';

export function Event(name?: string) {
  return function (target: GenericClass) {
    Reflect.defineMetadata(
      BoatConstants.eventEmitterName,
      name || target['name'],
      target,
    );
  };
}

export function ListensTo(event: string | GenericClass) {
  const eventName = typeof event === 'string' ? event : event['name'];
  return function (
    target: Record<string, any>,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    Reflect.defineMetadata(
      BoatConstants.eventName,
      eventName,
      target,
      propertyKey,
    );
  };
}
