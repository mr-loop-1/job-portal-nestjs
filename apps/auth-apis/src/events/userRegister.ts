import { Event, EmitsEvent } from '@libs/boat';

@Event(UserRegistered.name)
export class UserRegistered extends EmitsEvent {
  public data;
  constructor(data) {
    super();
    this.data = data;
  }
}
