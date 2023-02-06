import { JobOptions } from '@squareboat/nest-queue-strategy';
import 'reflect-metadata';
import { BoatConstants, BoatEvents } from '../constants';
import { ListensTo } from '../events';

export function Job(job: string, options?: JobOptions) {
  options = options || {};
  return function (target: Record<string, any>, propertyKey: string) {
    Reflect.defineMetadata(
      BoatConstants.queueJobName,
      job,
      target,
      propertyKey,
    );
    Reflect.defineMetadata(
      BoatConstants.queueOptions,
      options,
      target,
      propertyKey,
    );
  };
}

/**
 * Decorator for running methods on any failed jobs
 */
export function OnJobFailed() {
  return function (
    target: Record<string, any>,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ListensTo(BoatEvents.jobFailed)(target, propertyKey, descriptor);
  };
}

/**
 * Decorator for running methods on job processing
 */
export function OnJobProcessing() {
  return function (
    target: Record<string, any>,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ListensTo(BoatEvents.jobProcessing)(target, propertyKey, descriptor);
  };
}

/**
 * Decorator for running methods on any processed jobs
 */
export function OnJobProcessed() {
  return function (
    target: Record<string, any>,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ListensTo(BoatEvents.jobProcessed)(target, propertyKey, descriptor);
  };
}
