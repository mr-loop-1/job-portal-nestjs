import { Dispatch, ListensTo } from '@libs/boat';
import { Injectable } from '@nestjs/common';
import { JOB } from 'libs/common/constants';
import { JobAppliedByCandidate } from '../events';

@Injectable()
export class ApplyEventListener {
  @ListensTo(JobAppliedByCandidate.name)
  async candidateEventListener(data) {
    Dispatch({
      job: JOB.SEND_MAIL_TO_CANDIDATE,
      data: data,
    });
  }

  @ListensTo(JobAppliedByCandidate.name)
  async recruiterEventListener(data) {
    Dispatch({
      job: JOB.SEND_MAIL_TO_RECRUITER,
      data: data,
    });
  }
}
