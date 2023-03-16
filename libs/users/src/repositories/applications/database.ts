import { DatabaseRepository, InjectModel, Pagination } from '@libs/database';
import { Injectable } from '@nestjs/common';
import { IApplication } from 'libs/common/interfaces';
import { IApplicationSearch } from 'libs/common/interfaces/applicationSearch';
import { get } from 'lodash';

import { ApplicationModel } from './../../models/applications';
import { ApplicationRepositoryContract } from './contract';

@Injectable()
export class ApplicationsRepository
  extends DatabaseRepository<IApplication>
  implements ApplicationRepositoryContract
{
  @InjectModel(ApplicationModel)
  model: ApplicationModel;

  async getApplicants(jobId: number): Promise<IApplication[]> {
    const query = this.query();
    const applicants = await query
      .where({ jobId: jobId })
      .withGraphFetched('candidate')
      .all<IApplication>();
    return applicants;
  }

  async search(inputs: IApplicationSearch): Promise<Pagination<IApplication>> {
    const query = this.query();
    if (inputs.eager) {
      query.withGraphFetched(inputs.eager);
    }
    if (inputs.id) {
      query.where('applications.jobId', inputs.id);
    }
    if (inputs.status) {
      query.where('applications.status', inputs.status);
    }
    if (inputs.q) {
      query.where('applications.title', 'ilike', `%${inputs.q}%`);
    }

    inputs.sort
      ? query.cOrderBy(inputs.sort)
      : query.cOrderBy('createdAt:desc');

    return get(inputs, 'paginate', true)
      ? query.paginate<IApplication>(inputs.page, inputs.perPage)
      : query.allPages<IApplication>();
  }
}
