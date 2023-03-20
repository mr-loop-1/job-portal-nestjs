import { Event, EmitsEvent } from '@libs/boat';

@Event(ResetPassword.name)
export class ResetPassword extends EmitsEvent {
  public data;
  constructor(data) {
    super();
    console.log('constructor');
    this.data = data;
  }
}
