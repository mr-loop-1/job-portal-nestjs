import { Event, EmitsEvent } from '@libs/boat';

@Event(UserDeletedByAdmin.name)
export class UserDeletedByAdmin extends EmitsEvent {
  public data;
  constructor(data) {
    super();
    console.log('constructor');
    this.data = data;
  }
}
