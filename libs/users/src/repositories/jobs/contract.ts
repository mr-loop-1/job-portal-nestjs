import { ModelKeys, Pagination, RepositoryContract } from '@libs/database';
import { IJob, IJobSearch } from 'libs/common/interfaces/job';

export interface JobRepositoryContract extends RepositoryContract<IJob> {
  search(inputs: IJobSearch): Promise<Pagination<IJob>>;
  searchOne(inputs: ModelKeys<IJob>): Promise<IJob>;
}
