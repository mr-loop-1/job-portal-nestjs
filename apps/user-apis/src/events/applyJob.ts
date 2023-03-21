import { Event, EmitsEvent } from '@libs/boat';

@Event(JobAppliedByCandidate.name)
export class JobAppliedByCandidate extends EmitsEvent {
  public data;
  constructor(data) {
    super();
    this.data = data;
  }
}
