import { Transformer } from '@libs/boat';
import { IApplication, IUser } from 'libs/common/interfaces';
import { UserTransformer } from './user';

export class ApplicationTransformer extends Transformer {
  public availableIncludes: ['candidate'];
  async transform(application: IApplication): Promise<IApplication> {
    return {
      id: application.id,
      jobId: application.jobId,
      candidateId: application.candidateId,
      status: application.status,
      candidate: application?.candidate,
    };
  }
  async includeCandidate(model: IApplication): Promise<IUser> {
    return await this.item(model.candidate, new UserTransformer(), {});
  }
}
