import { Event, EmitsEvent } from '@libs/boat';

@Event(ForgotPassword.name)
export class ForgotPassword extends EmitsEvent {
  public data;
  constructor(data) {
    super();
    console.log('constructor');
    this.data = data;
  }
}
