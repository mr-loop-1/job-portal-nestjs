import { DatabaseRepository, InjectModel } from '@libs/database';
import { Injectable } from '@nestjs/common';
import { IApplication } from 'libs/common/interfaces';

import { ApplicationModel } from './../../models/applications';
import { ApplicationRepositoryContract } from './contract';

@Injectable()
export class ApplicationsRepository
  extends DatabaseRepository<IApplication>
  implements ApplicationRepositoryContract
{
  @InjectModel(ApplicationModel)
  model: ApplicationModel;
}
