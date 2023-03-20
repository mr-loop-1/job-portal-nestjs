import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JobLibService, UserLibService } from '@lib/users';
import { ApplicationLibService } from '@lib/users/services/applications';
import { Pagination } from '@libs/database';
import { Helpers } from '@libs/boat';
import { IApplication, IJob, IUser } from 'libs/common/interfaces';
import { ALREADY_APPLIED, JOB_APPLY_SUCCESS } from 'libs/common/constants';
import { Status } from 'libs/common/utils/status';

@Injectable()
export class CandidateService {
  constructor(
    private readonly jobService: JobLibService,
    private readonly applicationService: ApplicationLibService,
    private readonly userService: UserLibService,
  ) {}

  async getProfile(user: IUser): Promise<IUser> {
    const profile = await this.userService.repo.firstWhere({ id: user.id });
    return profile;
  }

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
    const exists = await this.applicationService.repo.exists({
      candidateId: user.id,
      jobId: jobId,
    });
    if (exists) {
      throw new HttpException(ALREADY_APPLIED, HttpStatus.CONFLICT);
    }
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
      eager: { job: true },
    });
    return applications;
  }
  async getApplicationDetailsById(
    applicationId: number,
  ): Promise<IApplication> {
    const application = await this.applicationService.repo.searchOne({
      id: applicationId,
      eager: { job: true },
    });
    return application;
  }
}
