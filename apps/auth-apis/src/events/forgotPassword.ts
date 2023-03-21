import { Event, EmitsEvent } from '@libs/boat';

@Event(ForgotPassword.name)
export class ForgotPassword extends EmitsEvent {
  public data;
  constructor(data) {
    super();
    this.data = data;
  }
}
