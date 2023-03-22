import { Pagination, RepositoryContract } from '@libs/database';
import { IApplication, IApplicationSearch } from 'libs/common/interfaces';

export interface ApplicationRepositoryContract
  extends RepositoryContract<IApplication> {
  search(inputs: IApplicationSearch): Promise<Pagination<IApplication>>;
  searchOne(inputs: IApplicationSearch): Promise<IApplication>;
}
