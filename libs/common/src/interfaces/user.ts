import { LoadRelSchema } from '@libs/database';

export interface IUser {
  userId?: string;
  id?: number;
  ulid?: string;
  name?: string;
  skills?: string;
  mobileNo?: string;
  role?: number;
  email?: string;
  password?: string;
  token?: string;
  status?: number;
  passwordUpdatedAt?: Date;
}

export interface IUserSearch extends IUser {
  page?: number;
  perPage?: number;
  q?: string;
  eager?: LoadRelSchema;
  sort?: string;
}
