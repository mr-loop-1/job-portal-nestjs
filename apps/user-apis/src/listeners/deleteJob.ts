import { Dispatch, ListensTo } from '@libs/boat';
import { Injectable } from '@nestjs/common';
import { JOB } from 'libs/common/constants';
import { JobDeleted } from '../events';

@Injectable()
export class DeleteEventListener {
  @ListensTo(JobDeleted.name)
  async JobEventListener(data) {
    Dispatch({
      job: JOB.DELETE_JOB_AND_ASSOCIATES,
      data: data,
    });
  }
}
