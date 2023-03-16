import { DatabaseRepository, InjectModel, Pagination } from '@libs/database';
import { Injectable } from '@nestjs/common';
import { IJob } from 'libs/common/interfaces';
import { get } from 'lodash';

import { JobModel } from './../../models/jobs';
import { JobRepositoryContract } from './contract';

@Injectable()
export class JobsRepository
  extends DatabaseRepository<IJob>
  implements JobRepositoryContract
{
  @InjectModel(JobModel)
  model: JobModel;

  async searchAll(recruiterId: number): Promise<IJob[]> {
    const query = this.query();
    const jobs = await query.where({ recruiterId: recruiterId }).all<IJob>();
    return jobs;
  }
}
