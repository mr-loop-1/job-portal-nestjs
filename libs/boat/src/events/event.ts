import { difference } from 'lodash';
import 'reflect-metadata';
import { BoatConstants } from '../constants';
import { Dispatch, JobOptions } from '../queue';
import { EventListenerRunner } from './runner';

export class EmitsEvent {
  private reservedKeyNames = [
    'fetchPayload',
    'emit',
    'reservedKeyNames',
    'dispatch',
  ];

  /**
   * Emit function
   * @returns Promise<void>
   */
  async emit(): Promise<void> {
    const eventName = Reflect.getMetadata(
      BoatConstants.eventEmitterName,
      this.constructor,
    );

    const shouldBeQueued = this['queueOptions'];
    if (!shouldBeQueued) {
      const runner = new EventListenerRunner();
      await runner.handle(eventName, this.fetchPayload());
      return;
    }

    const queueConnection = shouldBeQueued();
    await this.dispatch(eventName, queueConnection);
  }

  fetchPayload(): Record<string, any> {
    const payloadKeys = difference(
      Object.getOwnPropertyNames(this),
      this.reservedKeyNames,
    );

    const payload = {};
    for (const key of payloadKeys) {
      payload[key] = this[key];
    }

    return payload;
  }

  /**
   * Dispatches the job to queue
   * @param eventName
   * @param queueConnection
   *
   * @returns Promise<void>
   */
  async dispatch(
    eventName: string,
    queueConnection: JobOptions | JobOptions[],
  ): Promise<void> {
    const totalJobOptions = Array.isArray(queueConnection)
      ? queueConnection
      : [queueConnection];

    const eventData = this.fetchPayload();
    for (const option of totalJobOptions) {
      await Dispatch({
        job: BoatConstants.eventJobName,
        data: { eventName, eventData, discriminator: 'boatjs_generated_job' },
        ...(option || {}),
      });
    }
  }
}
