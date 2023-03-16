import { LoadRelSchema } from '@squareboat/nestjs-objection';
import { IApplication } from './application';

export interface IApplicationSearch extends IApplication {
  page: number;
  perPage: number;
  status: number;
  eager: LoadRelSchema;
  q: string;
}
