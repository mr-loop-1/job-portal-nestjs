import { Dispatch, ListensTo } from '@libs/boat';
import { Injectable } from '@nestjs/common';
import { JOB } from 'libs/common/constants';
import { UserDeleted } from '../events';

@Injectable()
export class DeleteEventListener {
  @ListensTo(UserDeleted.name)
  async UserEventListener(data) {
    Dispatch({
      job: JOB.DELETE_USER_AND_ASSOCIATES,
      data: data,
    });
    Dispatch({
      job: JOB.SEND_DELETE_MAIL_TO_USER,
      data: data,
    });
  }
}
