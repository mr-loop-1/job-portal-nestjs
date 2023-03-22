import { Pagination, RepositoryContract } from '@libs/database';
import { IUser, IUserSearch } from 'libs/common/interfaces';

export interface UserRepositoryContract extends RepositoryContract<IUser> {
  /**
   * @param params
   */
  search(inputs?: IUserSearch): Promise<Pagination<IUser>>;
}
