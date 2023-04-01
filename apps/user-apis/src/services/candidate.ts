import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JobLibService, UserLibService } from '@lib/users';
import { ApplicationLibService } from '@lib/users/services/applications';
import { Pagination } from '@libs/database';
import { AppConfig, EmitEvent, Helpers } from '@libs/boat';
import { IApplication, IJob, IUser } from 'libs/common/interfaces';
import { ERROR, SUCCESS } from 'libs/common/constants';
import { JobAppliedByCandidate } from '../events';
import {
  ApplicationIdDto,
  GetApplicationsDto,
  GetJobsDto,
  JobIdDto,
} from '../dto';
import { pick } from 'lodash';

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

  async getJobs(inputs: GetJobsDto): Promise<Pagination<IJob>> {
    const jobs = await this.jobService.repo.search({
      ...pick(inputs, ['page', 'perPage', 'q', 'sort']),
      status: AppConfig.get('settings.status.active'),
    });
    return jobs;
  }
  async getJobById(inputs: JobIdDto): Promise<IJob> {
    const job = await this.jobService.repo.firstWhere({
      ulid: inputs.id,
    });
    return job;
  }
  async applyToJobById(user: IUser, inputs: JobIdDto): Promise<string> {
    const candidate = await this.userService.repo.firstWhere({
      ulid: user.ulid,
    });
    const job = await this.jobService.repo.searchOne({
      ulid: inputs.id,
      eager: { recruiter: true },
    });

    const exists = await this.applicationService.repo.exists({
      candidateId: candidate.id,
      jobId: job.id,
      status: AppConfig.get('settings.status.active'),
    });
    if (exists) {
      throw new HttpException(
        ERROR.ALREADY_APPLIED,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const newApplication = {
      ulid: Helpers.ulid(),
      candidateId: user.id,
      jobId: job.id,
      status: AppConfig.get('settings.status.active'),
    };
    await this.applicationService.repo.create(newApplication);

    const ApplicationInfo = {
      candidateId: user.id,
      candidateName: user.name,
      jobId: job.id,
      jobTitle: job.title,
    };

    await EmitEvent(
      new JobAppliedByCandidate({
        applicantEmail: candidate.email,
        recruiterEmail: job.recruiter.email,
        info: ApplicationInfo,
      }),
    );

    return SUCCESS.JOB_APPLY_SUCCESS;
  }
  async getAllApplications(
    inputs: GetApplicationsDto,
    user: IUser,
  ): Promise<Pagination<IApplication>> {
    const applications = await this.applicationService.repo.search({
      candidateId: user.id,
      eager: { job: true },
      loadJob: true,
      ...pick(inputs, ['page', 'perPage', 'sort', 'q']),
      status: AppConfig.get('settings.status.active'),
    });
    return applications;
  }

  async getApplicationDetailsById(
    inputs: ApplicationIdDto,
  ): Promise<IApplication> {
    const application = await this.applicationService.repo.searchOne({
      ulid: inputs.id,
      eager: { job: true },
    });
    return application;
  }
}
