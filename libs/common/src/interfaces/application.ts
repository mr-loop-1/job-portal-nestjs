import { IUser } from './user';

export interface IApplication {
  id?: number;
  ulid?: string;
  candidateId?: number;
  jobId?: number;
  status?: number;
  candidate?: IUser;
}
