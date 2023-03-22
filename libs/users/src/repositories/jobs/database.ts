import { get } from 'lodash';
import { JobModel } from '@lib/users/models';
import { DatabaseRepository, InjectModel, Pagination } from '@libs/database';
import { Injectable } from '@nestjs/common';
import { IJob, IJobSearch } from 'libs/common/interfaces';
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
    if (inputs?.ulid) {
      query.where('jobs.ulid', inputs.ulid);
    }
    if (inputs?.status) {
      query.where('jobs.status', inputs.status);
    }
    if (inputs?.q) {
      query.where('jobs.name', 'ilike', `%${inputs.q}%`);
    }
    if (inputs?.recruiterId) {
      query.where('jobs.recruiterId', inputs.recruiterId);
    }

    inputs?.sort
      ? query.cOrderBy(inputs?.sort)
      : query.cOrderBy('createdAt:desc');

    return get(inputs, 'paginate', true)
      ? query.paginate<IJob>(inputs?.page, inputs?.perPage)
      : query.allPages<IJob>();
  }

  async searchOne(inputs: IJobSearch): Promise<IJob> {
    const query = this.query();
    if (inputs.eager) {
      query.withGraphFetched(inputs.eager);
    }
    if (inputs.id) {
      query.where('jobs.id', inputs.id);
    }
    if (inputs?.ulid) {
      query.where('jobs.ulid', inputs.ulid);
    }

    return await query.limit(1).first();
  }
}
