import { Dispatch, ListensTo } from '@libs/boat';
import { Injectable } from '@nestjs/common';
import { JOB } from 'libs/common/constants';
import { JobDeleted } from '../events';

@Injectable()
export class JobDeletedEventListener {
  @ListensTo(JobDeleted.name)
  async JobEventListener(data) {
    Dispatch({
      job: JOB.JOB_DELETED,
      data: data,
    });
  }
}
