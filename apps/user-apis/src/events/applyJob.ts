import { Event, EmitsEvent } from '@libs/boat';

@Event(JobAppliedByCandidate.name)
export class JobAppliedByCandidate extends EmitsEvent {
  public data;
  constructor(data) {
    super();
    console.log('constructor');
    this.data = data;
  }
}
