import { LoadRelSchema } from '@squareboat/nestjs-objection';
import { IApplication } from './application';

export interface IApplicationSearch extends IApplication {
  page?: number;
  perPage?: number;
  q?: string;
  status?: number;
  eager?: LoadRelSchema;
  sort?: string;
}
