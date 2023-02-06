import { BoatEvents } from '@libs/boat';
import { EmitsEvent, Event } from '@libs/boat/events';

@Event(BoatEvents.jobFailed)
export class JobFailed extends EmitsEvent {
  constructor() {
    super();
  }
}

@Event(BoatEvents.jobProcessed)
export class JobProcessed extends EmitsEvent {
  constructor() {
    super();
  }
}

@Event(BoatEvents.jobProcessing)
export class JobProcessing extends EmitsEvent {
  constructor() {
    super();
  }
}
