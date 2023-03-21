import { Event, EmitsEvent } from '@libs/boat';

@Event(ResetPassword.name)
export class ResetPassword extends EmitsEvent {
  public data;
  constructor(data) {
    super();
    this.data = data;
  }
}
