import { Job } from '@libs/boat';
import { Injectable } from '@nestjs/common';
import { Mailman } from '@squareboat/nest-mailman';
import { JOB } from 'libs/common/constants';
import { UserForgotMail, UserRegisterMail, UserResetMail } from './mailMessage';

@Injectable()
export class UserForgotNotificationService {
  @Job(JOB.SEND_OTP_MAIL_TO_USER)
  async forgotMail(data: Record<string, any>) {
    const mail = new UserForgotMail(data.data.info);
    try {
      await Mailman.init().to(data.data.userEmail).send(mail);
    } catch (error) {
      console.log(error);
    }
  }
}

@Injectable()
export class UserResetNotificationService {
  @Job(JOB.SEND_RESET_MAIL_TO_USER)
  async resetMail(data: Record<string, any>) {
    const mail = new UserResetMail();
    try {
      await Mailman.init().to(data.data.userEmail).send(mail);
    } catch (error) {
      console.log(error);
    }
  }
}

@Injectable()
export class UserRegsiterNotificationService {
  @Job(JOB.SEND_REGISTER_MAIL_TO_USER)
  async resetMail(data: Record<string, any>) {
    const mail = new UserRegisterMail();
    try {
      await Mailman.init().to(data.data.userEmail).send(mail);
    } catch (error) {
      console.log(error);
    }
  }
}
