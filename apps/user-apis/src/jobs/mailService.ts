import { Job } from '@libs/boat';
import { Injectable } from '@nestjs/common';
import { Mailman } from '@squareboat/nest-mailman';
import { JOB } from 'libs/common/constants';
import { CandidateMail, RecruiterMail } from './mailMessage';

@Injectable()
export class CandidateNotificationService {
  @Job(JOB.SEND_MAIL_TO_CANDIDATE)
  async sampleMethod(data: Record<string, any>) {
    console.log('mail sending....');
    const mail = new CandidateMail(data.data.info);
    try {
      await Mailman.init().to(data.data.applicantEmail).send(mail);
    } catch (error) {
      console.log(error);
    }
    console.log('applied here');
  }
}

@Injectable()
export class RecruiterNotificationService {
  @Job(JOB.SEND_MAIL_TO_RECRUITER)
  async sampleMethod(data: Record<string, any>) {
    const mail = new RecruiterMail(data.data.info);
    try {
      await Mailman.init().to(data.data.recruiterEmail).send(mail);
    } catch (error) {
      console.log(error);
    }
    console.log('applied here');
  }
}
