import { RepositoryContract } from '@libs/database';
import { IJob } from 'libs/common/interfaces/job';

export interface JobRepositoryContract extends RepositoryContract<IJob> {
  searchAll(recruiterId: number): Promise<IJob[]>;
}
