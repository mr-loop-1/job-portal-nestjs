import { BaseModel } from '@libs/database';
import { UserModel } from './users';

export class ApplicationModel extends BaseModel {
  static tableName = 'applications';
  static get relationMappings() {
    return {
      job: {
        relation: BaseModel.HasManyRelation,
        modelClass: UserModel,
        join: {
          from: 'users.id',
          to: 'jobs.recruiterId',
        },
      },
      candidate: {
        relation: BaseModel.HasManyRelation,
        modelClass: UserModel,
        join: {
          from: 'users.id',
          to: 'jobs.candidateId',
        },
      },
    };
  }
}
