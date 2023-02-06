export type GenericFunction = (...args: any[]) => any;
export type GenericClass = Record<string, any>;

export class BoatConstants {
  static boatjsOptions = 'boatjs/core_options';

  static commandName = 'boatjs/command_name';
  static commandOptions = 'boatjs/command_options';

  static eventEmitterName = 'boatjs/event_emitter_name';
  static eventName = 'boatjs/event_name';
  static eventJobName = 'boatjs/queued_event_handler_job';

  static storageOptions = 'boatjs/storage_options';

  static queueJobName = 'boatjs/queue_job_name';
  static queueOptions = 'boatjs/queue_options';

  static customValidationDecorators = 'boatjs/custom_validation_decorators';
  static classOptionalProperties = 'boatjs/class_optional_properties';
}

export class BoatEvents {
  static jobFailed = 'boatjs/job_failed_event';
  static jobProcessed = 'boatjs/job_processed';
  static jobProcessing = 'boatjs/job_processing';
}
