import { LoadRelSchema } from '@squareboat/nestjs-objection';
import { IUser } from './user';

export interface IJob {
  jobId?: string;
  id?: number;
  ulid?: string;
  title?: string;
  description?: string;
  location?: string;
  recruiterId?: number;
  status?: number;
  recruiter?: IUser;
}

export interface IJobSearch extends IJob {
  page?: number;
  perPage?: number;
  q?: string;
  eager?: LoadRelSchema;
  eagerFilter?: string;
  sort?: string;
}
