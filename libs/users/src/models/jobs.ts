import { BaseModel } from '@libs/database';
import { UserModel } from './users';

export class JobModel extends BaseModel {
  static tableName = 'jobs';
  static get relationMappings() {
    return {
      recruiter: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'jobs.recruiterId',
          to: 'users.id',
        },
      },
    };
  }
}
