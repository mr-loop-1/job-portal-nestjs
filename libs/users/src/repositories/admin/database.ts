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
}