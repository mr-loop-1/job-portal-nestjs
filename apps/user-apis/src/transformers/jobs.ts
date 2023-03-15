import { Transformer } from '@libs/boat';
import { IJob } from 'libs/common/interfaces';

export class JobsTransformer extends Transformer {
  async transform(jobs: IJob[]): Promise<IJob[]> {
    return jobs.map((job: IJob) => {
      return {
        id: job.id,
        title: job.title,
        description: job.description,
        location: job.location,
      };
    });
  }
}
