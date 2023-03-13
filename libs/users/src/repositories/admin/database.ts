import { DatabaseRepository, InjectModel } from '@libs/database';
import { Injectable } from '@nestjs/common';
import { IAdmin } from 'libs/common/interfaces';

import { AdminModel } from './../../models/admin';
import { AdminRepositoryContract } from './contract';


@Injectable()
export class AdminRepository
  extends DatabaseRepository  <IAdmin>
  implements AdminRepositoryContract
{
  @InjectModel(AdminModel)
  model: AdminModel;

  // async searchAdmin(){
  //   const query= this.query()
  //   // query.findOne()
  // }

  async searchOne(email, password) {
    console.log(email, password);
    const res = this.query().where('email', '=', email).where('password', '=', password).debug();

    console.log('res = ', res);
  }
}