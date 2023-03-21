import { Dispatch, ListensTo } from '@libs/boat';
import { Injectable } from '@nestjs/common';
import { JOB } from 'libs/common/constants';
import { UserDeletedByAdmin } from '../events';

@Injectable()
export class DeleteEventListener {
  @ListensTo(UserDeletedByAdmin.name)
  async candidateEventListener(data) {
    Dispatch({
      job: JOB.SEND_DELETE_MAIL_TO_USER,
      data: data,
    });
  }
}
