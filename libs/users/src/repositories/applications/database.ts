import { DatabaseRepository, InjectModel, Pagination } from '@libs/database';
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

  async getApplicants(jobId: number): Promise<IApplication[]> {
    const query = this.query();
    const applicants = await query
      .where({ jobId: jobId })
      .withGraphFetched('candidate')
      .all<IApplication>();

    // const results = get(inputs, 'paginate', true)
    return applicants;
  }

  search(inputs: IApplicationSearch): Promise<Pagination<IApplication>> {
    const query = this.query();
    if (inputs.eager) {
      query.withGraphFetched(inputs.eager);
    }
    if (inputs.id) {
      query.where('collections.id', inputs.id);
    }
    if (inputs.status) {
      query.where('collections.status', inputs.status);
    }
    if (inputs.q) {
      query.innerJoin('cities', 'collections.cityId', 'cities.id');
      query
        .orWhere('collections.name', 'ilike', `%${inputs.q}%`)
        .orWhere('cities.name', 'ilike', `%${inputs.q}%`);
    }
    if (inputs.slug) {
      query.where('collections.slug', inputs.slug);
    }
    if (inputs.cityId) {
      query.where('collections.cityId', inputs.cityId);
    }
    inputs.sort
      ? query.cOrderBy(inputs.sort)
      : query.cOrderBy('createdAt:desc');
    return get(inputs, 'paginate', true)
      ? query.paginate<ICollectionModel>(inputs.page, inputs.perPage)
      : query.allPages<ICollectionModel>();
  }
}
