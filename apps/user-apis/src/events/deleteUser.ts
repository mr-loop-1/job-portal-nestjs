import { Event, EmitsEvent } from '@libs/boat';

@Event(UserDeleted.name)
export class UserDeleted extends EmitsEvent {
  public data;
  constructor(data) {
    super();
    this.data = data;
  }
}
