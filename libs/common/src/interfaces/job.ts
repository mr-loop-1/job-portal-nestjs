import { IUser } from './user';

export interface IJob {
  id?: number;
  ulid?: string;
  title?: string;
  description?: string;
  location?: string;
  recruiterId?: number;
  recruiter?: IUser;
}
