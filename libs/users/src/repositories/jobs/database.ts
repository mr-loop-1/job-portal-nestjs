import {
  DatabaseRepository,
  InjectModel,
  ModelKeys,
  Pagination,
} from '@libs/database';
import { Injectable } from '@nestjs/common';
import { IJob, IJobSearch } from 'libs/common/interfaces';
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

  async search(inputs?: IJobSearch): Promise<Pagination<IJob>> {
    const query = this.query();
    if (inputs?.eager) {
      query.withGraphFetched(inputs.eager);
    }
    if (inputs?.id) {
      query.where('jobs.id', inputs.id);
    }
    if (inputs?.status) {
      query.where('jobs.status', inputs.status);
    }
    if (inputs?.q) {
      query.where('jobs.name', 'ilike', `%${inputs.q}%`);
    }

    inputs?.sort
      ? query.cOrderBy(inputs.sort)
      : query.cOrderBy('createdAt:desc');

    return get(inputs, 'paginate', true)
      ? query.paginate<IJob>(inputs.page, inputs.perPage)
      : query.allPages<IJob>();
  }

  async searchOne(inputs: ModelKeys<IJob>): Promise<IJob> {
    const query = this.query();
    const job = await query.where(inputs).debug();
    console.log(job);
    return job;
  }
}