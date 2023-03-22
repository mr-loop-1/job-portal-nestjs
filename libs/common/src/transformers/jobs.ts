import { Transformer } from '@libs/boat';
import { IJob } from 'libs/common/interfaces';
import { UserTransformer } from './user';

export class JobsTransformer extends Transformer {
  async transform(job: IJob): Promise<IJob> {
    return {
      jobId: job.ulid,
      title: job.title,
      description: job.description,
      location: job.location,
      recruiter:
        job?.recruiter &&
        (await this.item(job.recruiter, new UserTransformer(), {})),
    };
  }
}
