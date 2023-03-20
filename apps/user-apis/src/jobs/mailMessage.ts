import { MailMessage } from '@squareboat/nest-mailman';

export class CandidateMail extends MailMessage {
  constructor(private data: any) {
    super();
  }
  async handle(): Promise<MailMessage> {
    const subject = `Application Submitted`;
    return this.subject(subject).line(`Application Submitted!`)
      .line(`Your application for Job ${this.data.jobId} titled 
      ${this.data.jobTitle} was submitted`);
  }
}
export class RecruiterMail extends MailMessage {
  constructor(private data: any) {
    super();
  }
  async handle(): Promise<MailMessage> {
    const subject = `New Application recieved`;
    return this.subject(subject).line(`New Application recived!`)
      .line(`Applicant ${this.data.candidateId} ${this.data.candidateName}
    submitted application for Job ${this.data.jobId} titled ${this.data.jobTitle}`);
  }
}
