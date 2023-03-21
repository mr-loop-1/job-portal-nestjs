import { MailMessage } from '@squareboat/nest-mailman';

export class UserForgotMail extends MailMessage {
  constructor(private data: any) {
    super();
  }
  async handle(): Promise<MailMessage> {
    const subject = `Reset Password`;
    return this.subject(subject)
      .line(`Enter this Otp while resetting password`)
      .line(`Your Otp is ${this.data.otp}`);
  }
}

export class UserResetMail extends MailMessage {
  constructor() {
    super();
  }
  async handle(): Promise<MailMessage> {
    const subject = `Password Reset Success`;
    return this.subject(subject).line(
      `Password to you account was reset succcessfully`,
    );
  }
}

export class UserRegisterMail extends MailMessage {
  constructor() {
    super();
  }
  async handle(): Promise<MailMessage> {
    const subject = `Account Regsitered`;
    return this.subject(subject).line(`Your account has been created`);
  }
}
