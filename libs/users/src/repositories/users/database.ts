import { get } from 'lodash';
import { DatabaseRepository, InjectModel, Pagination } from '@libs/database';
import { UserModel } from '@lib/users/models';
import { Injectable } from '@nestjs/common';
import { IUser, IUserSearch } from 'libs/common/interfaces';
import { UserRepositoryContract } from './contract';
import { ROLE } from 'libs/common/constants';

@Injectable()
export class UserRepository
  extends DatabaseRepository<IUser>
  implements UserRepositoryContract
{
  @InjectModel(UserModel)
  model: UserModel;

  /**
   * @param params
   */
  async search(inputs?: IUserSearch): Promise<Pagination<IUser>> {
    const query = this.query();
    if (inputs?.eager) {
      query.withGraphFetched(inputs.eager);
    }
    if (inputs?.id) {
      query.where('users.id', inputs.id);
    }
    if (inputs?.ulid) {
      query.where('users.ulid', inputs.ulid);
    }
    if (inputs?.status === 1 || inputs?.status === 0) {
      query.where('users.status', inputs.status);
    }
    if (inputs?.q) {
      query.where('users.name', 'ilike', `%${inputs.q}%`);
    }
    if (inputs?.role) {
      query.where('users.role', inputs.role);
    }
    query.where('users.role', '!=', ROLE.admin);

    inputs?.sort
      ? query.cOrderBy(inputs?.sort)
      : query.cOrderBy('createdAt:desc');

    return get(inputs, 'paginate', true)
      ? query.paginate<IUser>(inputs?.page, inputs?.perPage)
      : query.allPages<IUser>();
  }
}
