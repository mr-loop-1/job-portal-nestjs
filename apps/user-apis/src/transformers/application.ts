import { Transformer } from '@libs/boat';
import { IApplication } from 'libs/common/interfaces';
import { JobsTransformer } from './jobs';
import { UserTransformer } from './user';

export class ApplicationTransformer extends Transformer {
  async transform(application: IApplication): Promise<IApplication> {
    return {
      ulid: application.ulid,
      status: application.status,
      candidate:
        application?.candidate &&
        (await this.item(application.candidate, new UserTransformer(), {})),
      job:
        application?.job &&
        (await this.item(application.job, new JobsTransformer(), {})),
    };
  }
}
