import { Event, EmitsEvent } from '@libs/boat';

@Event(UserDeletedByAdmin.name)
export class UserDeletedByAdmin extends EmitsEvent {
  public data;
  constructor(data) {
    super();
    this.data = data;
  }
}
