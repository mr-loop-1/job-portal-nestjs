import { LoadRelSchema } from '@libs/database';

export interface IUser {
  id?: number;
  ulid?: string;
  name?: string;
  skills?: string;
  mobileNo?: string;
  role?: number;
  email?: string;
  password?: string;
  token?: string;
}

export interface IUserSearch extends IUser {
  page?: number;
  perPage?: number;
  q?: string;
  status?: number;
  eager?: LoadRelSchema;
  sort?: string;
}
