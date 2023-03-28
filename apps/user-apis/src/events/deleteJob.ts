import { Event, EmitsEvent } from '@libs/boat';

@Event(JobDeleted.name)
export class JobDeleted extends EmitsEvent {
  public data;
  constructor(data) {
    super();
    this.data = data;
  }
}
