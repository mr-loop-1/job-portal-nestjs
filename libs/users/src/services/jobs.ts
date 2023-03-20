import { Injectable, Inject } from '@nestjs/common';
import { JobLibConstants } from '../constant';
import { JobRepositoryContract } from '../repositories/jobs/contract';

@Injectable()
export class JobLibService {
  constructor(
    @Inject(JobLibConstants.JOB_REPOSITORY)
    public readonly repo: JobRepositoryContract,
  ) {}
}
