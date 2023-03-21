import { Dispatch, ListensTo } from '@libs/boat';
import { Injectable } from '@nestjs/common';
import { JOB } from 'libs/common/constants';
import { UserRegistered } from '../events';

@Injectable()
export class UserRegisterEventListener {
  @ListensTo(UserRegistered.name)
  async userRegisterListener(data) {
    Dispatch({
      job: JOB.SEND_REGISTER_MAIL_TO_USER,
      data: data,
    });
  }
}
