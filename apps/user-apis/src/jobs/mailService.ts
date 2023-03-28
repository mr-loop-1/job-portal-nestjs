import { Job } from '@libs/boat';
import { Injectable } from '@nestjs/common';
import { Mailman } from '@squareboat/nest-mailman';
import { JOB } from 'libs/common/constants';
import { CandidateMail, DeleteMail, RecruiterMail } from './mailMessage';

@Injectable()
export class CandidateNotificationService {
  @Job(JOB.SEND_MAIL_TO_CANDIDATE)
  async sendCandidateMail(data: Record<string, any>) {
    const mail = new CandidateMail(data.data.info);
    try {
      await Mailman.init().to(data.data.applicantEmail).send(mail);
    } catch (error) {
      console.log(error);
    }
  }
}

@Injectable()
export class RecruiterNotificationService {
  @Job(JOB.SEND_MAIL_TO_RECRUITER)
  async sendRecruiterMail(data: Record<string, any>) {
    const mail = new RecruiterMail(data.data.info);
    try {
      await Mailman.init().to(data.data.recruiterEmail).send(mail);
    } catch (error) {
      console.log(error);
    }
  }
}

@Injectable()
export class UserDeleteNotificationService {
  @Job(JOB.SEND_DELETE_MAIL_TO_USER)
  async SendDeleteMail(data: Record<string, any>) {
    const mail = new DeleteMail();
    try {
      await Mailman.init().to(data.data.user.email).send(mail);
    } catch (error) {
      console.log(error);
    }
  }
}
