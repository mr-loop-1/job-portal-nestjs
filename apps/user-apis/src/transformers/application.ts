import { Transformer } from '@libs/boat';
import { IApplication, IUser } from 'libs/common/interfaces';
import { UserTransformer } from './user';

export class ApplicationTransformer extends Transformer {
  async transform(application: IApplication): Promise<IApplication> {
    return {
      id: application.id,
      jobId: application.jobId,
      candidateId: application.candidateId,
      status: application.status,
      candidate: await this.item(
        application?.candidate,
        new UserTransformer(),
        {},
      ),
    };
  }
}
