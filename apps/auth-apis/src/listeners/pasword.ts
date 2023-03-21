import { Dispatch, ListensTo } from '@libs/boat';
import { Injectable } from '@nestjs/common';
import { JOB } from 'libs/common/constants';
import { ForgotPassword } from '../events';
import { ResetPassword } from '../events/resetPassword';

@Injectable()
export class PasswordEventListener {
  @ListensTo(ForgotPassword.name)
  async forgotPasswordListener(data) {
    Dispatch({
      job: JOB.SEND_OTP_MAIL_TO_USER,
      data: data,
    });
  }

  @ListensTo(ResetPassword.name)
  async resetPasswordListener(data) {
    Dispatch({
      job: JOB.SEND_RESET_MAIL_TO_USER,
      data: data,
    });
  }
}
