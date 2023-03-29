import { Dispatch, ListensTo } from '@libs/boat';
import { Injectable } from '@nestjs/common';
import { JOB } from 'libs/common/constants';
import { UserDeleted } from '../events';

@Injectable()
export class UserDeletedEventListener {
  @ListensTo(UserDeleted.name)
  async UserEventListener(data) {
    Dispatch({
      job: JOB.USER_DELETED,
      data: data,
    });
    Dispatch({
      job: JOB.SEND_DELETE_MAIL_TO_USER,
      data: data,
    });
  }
}
