import { Transformer } from '@libs/boat';
import { IJob } from 'libs/common/interfaces';

export class JobsTransformer extends Transformer {
  async transform(job: IJob): Promise<IJob> {
    return {
      id: job.id,
      title: job.title,
      description: job.description,
      location: job.location,
    };
  }
}