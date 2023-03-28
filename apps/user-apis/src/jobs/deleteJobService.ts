import {
  ApplicationLibService,
  JobLibService,
  UserLibService,
} from '@lib/users';
import { AppConfig, Job } from '@libs/boat';
import { Injectable } from '@nestjs/common';
import { JOB } from 'libs/common/constants';

@Injectable()
export class JobDeletedCleanupService {
  constructor(
    private readonly applicationService: ApplicationLibService,
    private readonly jobService: JobLibService,
  ) {}

  @Job(JOB.DELETE_JOB_AND_ASSOCIATES)
  async cleanup(data: Record<string, any>) {
    await this.applicationService.repo.updateWhere(
      { jobId: data.data.job.id },
      { status: AppConfig.get('settings.status.inactive') },
    );
    await this.jobService.repo.updateWhere(
      { id: data.data.job.id },
      { status: AppConfig.get('settings.status.inactive') },
    );
  }
}
