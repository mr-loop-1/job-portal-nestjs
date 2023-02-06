import { Injectable } from '@nestjs/common';
import { BoatConstants } from '../constants';
import { Job } from '../queue';
import { EventListenerRunner } from './runner';

@Injectable()
export class EventQueueWorker {
  @Job(BoatConstants.eventJobName)
  async handle(data: Record<string, any>): Promise<void> {
    const { eventName, eventData } = data;
    const runner = new EventListenerRunner();
    await runner.handle(eventName, eventData);
  }
}
