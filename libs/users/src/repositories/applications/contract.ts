import { Pagination, RepositoryContract } from '@libs/database';
import { IApplication } from 'libs/common/interfaces/application';
import { IApplicationSearch } from 'libs/common/interfaces/applicationSearch';

export interface ApplicationRepositoryContract
  extends RepositoryContract<IApplication> {
  search(inputs: IApplicationSearch): Promise<Pagination<IApplication>>;
  searchOne(inputs: IApplicationSearch): Promise<IApplication>;
}
