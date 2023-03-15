import { DatabaseRepository, InjectModel } from '@libs/database';
import { Injectable } from '@nestjs/common';
import { IJob } from 'libs/common/interfaces';

import { JobModel } from './../../models/jobs';
import { JobRepositoryContract } from './contract';

@Injectable()
export class JobsRepository
  extends DatabaseRepository<IJob>
  implements JobRepositoryContract
{
  @InjectModel(JobModel)
  model: JobModel;
}
