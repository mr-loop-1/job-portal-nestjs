import { BaseModel } from '@libs/database';
import { UserModel } from './users';

export class JobModel extends BaseModel {
  static tableName = 'jobs';
  static get relationMappings() {
    return {
      recruiter: {
        relation: BaseModel.HasManyRelation,
        modelClass: UserModel,
        join: {
          from: 'users.id',
          to: 'jobs.recruiterId',
        },
      },
    };
  }
}
