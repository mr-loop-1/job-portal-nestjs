import { BaseModel } from '@libs/database';
import { UserModel } from './users';

export class ApplicationModel extends BaseModel {
  static tableName = 'applications';
  static get relationMappings() {
    return {
      job: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'jobs.recruiterId',
          to: 'users.id',
        },
      },
      candidate: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'jobs.candidateId',
          to: 'users.id',
        },
      },
    };
  }
}
