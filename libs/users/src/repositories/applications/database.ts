import { get } from 'lodash';
import { ApplicationModel } from '@lib/users/models';
import { DatabaseRepository, InjectModel, Pagination } from '@libs/database';
import { Injectable } from '@nestjs/common';
import { IApplication, IApplicationSearch } from 'libs/common/interfaces';
import { ApplicationRepositoryContract } from './contract';
import { STATUS } from 'libs/common/constants';
import { AppConfig } from '@libs/boat';

@Injectable()
export class ApplicationsRepository
  extends DatabaseRepository<IApplication>
  implements ApplicationRepositoryContract
{
  @InjectModel(ApplicationModel)
  model: ApplicationModel;

  async search(inputs: IApplicationSearch): Promise<Pagination<IApplication>> {
    const query = this.query();
    if (inputs?.eager) {
      query.withGraphFetched(inputs.eager);
    }
    if (inputs?.id) {
      query.where('applications.id', inputs.id);
    }
    if (inputs?.ulid) {
      query.where('applications.ulid', inputs.ulid);
    }
    if (
      inputs?.status === AppConfig.get('settings.status.active') ||
      inputs?.status === AppConfig.get('settings.status.inactive')
    ) {
      query.where('applications.status', inputs.status);
    }
    if (inputs?.q) {
      query.where('applications.title', 'ilike', `%${inputs.q}%`);
    }
    if (inputs?.jobId) {
      query.where('applications.jobId', inputs.jobId);
    }
    if (inputs?.candidateId) {
      query.where('applications.candidateId', inputs.candidateId);
    }

    inputs.sort
      ? query.cOrderBy(inputs.sort)
      : query.cOrderBy('createdAt:desc');

    return get(inputs, 'paginate', true)
      ? query.paginate<IApplication>(inputs.page, inputs.perPage)
      : query.allPages<IApplication>();
  }

  async searchOne(inputs: IApplicationSearch): Promise<IApplication> {
    const query = this.query();
    if (inputs.eager) {
      query.withGraphFetched(inputs.eager);
    }
    if (inputs.id) {
      query.where('applications.id', inputs.id);
    }
    if (inputs?.ulid) {
      query.where('applications.ulid', inputs.ulid);
    }

    return await query.limit(1).first();
  }
}
