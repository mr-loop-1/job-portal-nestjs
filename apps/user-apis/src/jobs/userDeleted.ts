import {
  ApplicationLibService,
  JobLibService,
  UserLibService,
} from '@lib/users';
import { AppConfig, Job } from '@libs/boat';
import { Injectable } from '@nestjs/common';
import { JOB } from 'libs/common/constants';

@Injectable()
export class UserDeleted {
  constructor(
    private readonly userService: UserLibService,
    private readonly applicationService: ApplicationLibService,
    private readonly jobService: JobLibService,
  ) {}

  @Job(JOB.USER_DELETED)
  async cleanup(data: Record<string, any>) {
    if (data.data.user.role === AppConfig.get('settings.user.role.candidate')) {
      await this.applicationService.repo.updateWhere(
        { candidateId: data.data.user.id },
        { status: AppConfig.get('settings.status.inactive') },
      );
      await this.userService.repo.updateWhere(
        { id: data.data.user.id },
        { status: AppConfig.get('settings.status.inactive') },
      );
    } else if (
      data.data.user.role === AppConfig.get('settings.user.role.recruiter')
    ) {
      const jobs = await this.jobService.repo.getWhere({
        recruiterId: data.data.user.id,
      });
      jobs.forEach(async (job) => {
        await this.applicationService.repo.updateWhere(
          { jobId: job.id },
          { status: AppConfig.get('settings.status.inactive') },
        );
      });
      await this.jobService.repo.updateWhere(
        { recruiterId: data.data.user.id },
        { status: AppConfig.get('settings.status.inactive') },
      );
      await this.userService.repo.updateWhere(
        { id: data.data.user.id },
        { status: AppConfig.get('settings.status.inactive') },
      );
    }
  }
}
