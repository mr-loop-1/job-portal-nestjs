import { BaseModel } from '@libs/database';
import { JobModel } from './jobs';
import { UserModel } from './users';

export class ApplicationModel extends BaseModel {
  static tableName = 'applications';
  static get relationMappings() {
    return {
      job: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: JobModel,
        join: {
          from: 'applications.jobId',
          to: 'jobs.id',
        },
      },
      candidate: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'applications.candidateId',
          to: 'users.id',
        },
      },
    };
  }
}
