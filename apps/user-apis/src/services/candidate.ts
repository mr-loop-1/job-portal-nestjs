import { Injectable } from '@nestjs/common';
import { JobLibService, UserLibService } from '@lib/users';
import { ApplicationLibService } from '@lib/users/services/applications';
import { Pagination } from '@libs/database';
import { IApplication, IJob, IUser } from 'libs/common/interfaces';
import { JOB_APPLY_SUCCESS } from 'libs/common/constants';
import { Status } from 'libs/common/utils/status';
import { Helpers } from '@libs/boat';

@Injectable()
export class CandidateService {
  constructor(
    private readonly jobService: JobLibService,
    private readonly applicationService: ApplicationLibService,
  ) {}

  async getJobs(): Promise<Pagination<IJob>> {
    const jobs = await this.jobService.repo.search();
    return jobs;
  }
  async getJobById(jobId: number): Promise<IJob> {
    const job = await this.jobService.repo.firstWhere({
      id: jobId,
    });
    return job;
  }
  async applyToJobById(user: IUser, jobId: number): Promise<string> {
    const newApplication = {
      ulid: Helpers.ulid(),
      candidateId: user.id,
      jobId: jobId,
      status: Status.Applied,
    };
    await this.applicationService.repo.create(newApplication);
    return JOB_APPLY_SUCCESS;
  }
  async getAllApplications(user: IUser): Promise<Pagination<IApplication>> {
    const applications = await this.applicationService.repo.search({
      candidateId: user.id,
    });
    return applications;
  }
  async getApplicationDetailsById(
    user: IUser,
    applicationId: number,
  ): Promise<IApplication> {
    const application = await this.applicationService.repo.firstWhere({
      id: applicationId,
      candidateId: user.id,
    });
    return application;
  }
}
