import { DatabaseRepository, InjectModel } from '@libs/database';
import { Injectable } from '@nestjs/common';
import { IUser } from 'libs/common/interfaces';

import { UserModel } from './../../models/users';
import { UserRepositoryContract } from './contract';


@Injectable()
export class UserRepository
  extends DatabaseRepository<IUser>
  implements UserRepositoryContract {
  @InjectModel(UserModel)
  model: UserModel;

  /**
   * @param params 
   */
  async existsUserEmail(params: string): Promise<boolean> {
    const query = this.query();
    query.where({ email: params.toString() }).where('role', '!=', 3).debug();
    return !!(await query.onlyCount());
  }
}