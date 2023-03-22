import { LoadRelSchema } from '@squareboat/nestjs-objection';
import { IJob } from './job';
import { IUser } from './user';

export interface IApplication {
  applicationId?: string;
  id?: number;
  ulid?: string;
  candidateId?: number;
  jobId?: number;
  status?: number;
  candidate?: IUser;
  job?: IJob;
}

export interface IApplicationSearch extends IApplication {
  page?: number;
  perPage?: number;
  q?: string;
  status?: number;
  eager?: LoadRelSchema;
  sort?: string;
}
