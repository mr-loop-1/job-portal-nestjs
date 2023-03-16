import { RepositoryContract } from '@libs/database';
import { IApplication } from 'libs/common/interfaces/application';

export interface ApplicationRepositoryContract
  extends RepositoryContract<IApplication> {}
