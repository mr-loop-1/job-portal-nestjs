import { pick } from 'lodash';
import { Injectable } from '@nestjs/common';
import { ApplicationLibService } from '@lib/users/services/applications';
import { JobLibService, UserLibService } from '@lib/users';
import { Pagination } from '@libs/database';
import { AppConfig, Helpers } from '@libs/boat';
import { JOB_CREATE_SUCCESS, JOB_UPDATE_SUCCES } from 'libs/common/constants';
import { IApplication, IJob, IUser } from 'libs/common/interfaces';
import {
  ApplicationIdDto,
  JobIdDto,
  UpdateJobDto,
  UserIdDto,
  CreateJobDto,
  UpdateStatusDto,
} from '../dto';

@Injectable()
export class RecruiterService {
  constructor(
    private readonly userService: UserLibService,
    private readonly jobService: JobLibService,
    private readonly applicationService: ApplicationLibService,
  ) {}

  async getProfile(user: IUser): Promise<IUser> {
    const profile = await this.userService.repo.firstWhere({ id: user.id });
    return profile;
  }

  async createJob(inputs: CreateJobDto, recruiter: IUser): Promise<string> {
    const recruiterId = recruiter.id;
    const createJob = {
      ulid: Helpers.ulid(),
      recruiterId: recruiterId,
      ...pick(inputs, ['title', 'description', 'location']),
      status: AppConfig.get('settings.status.active'),
    };
    await this.jobService.repo.create(createJob);
    return JOB_CREATE_SUCCESS;
  }

  async getJobs(recruiter: IUser): Promise<Pagination<IJob>> {
    const jobs = await this.jobService.repo.search({
      recruiterId: recruiter.id,
      status: AppConfig.get('settings.status.active'),
    });
    return jobs;
  }

  async getJobById(recruiter: IUser, inputs: JobIdDto): Promise<IJob> {
    const job = await this.jobService.repo.firstWhere({
      recruiterId: recruiter.id,
      ulid: inputs.id,
    });
    return job;
  }

  async changeJobById(recruiter: IUser, inputs: UpdateJobDto): Promise<string> {
    const updateJob = pick(inputs, ['title', 'description', 'location']);
    await this.jobService.repo.updateWhere(
      {
        ulid: inputs.id,
        recruiterId: recruiter.id,
      },
      updateJob,
    );
    return JOB_UPDATE_SUCCES;
  }

  async getApplicantsByJobId(
    inputs: ApplicationIdDto,
  ): Promise<Pagination<IApplication>> {
    const jobs = await this.jobService.repo.firstWhere({ ulid: inputs.id });
    const applications = await this.applicationService.repo.search({
      jobId: jobs.id,
      eager: { candidate: true },
    });
    return applications;
  }

  async getUserByUserId(inputs: UserIdDto): Promise<IUser> {
    const user = await this.userService.repo.firstWhere({
      ulid: inputs.id,
    });
    return user;
  }

  async changeStatusByApplicationId(
    inputs: UpdateStatusDto,
  ): Promise<IApplication> {
    await this.applicationService.repo.updateWhere(
      {
        ulid: inputs.id,
      },
      { status: inputs.status },
    );
    const application = await this.applicationService.repo.firstWhere({
      ulid: inputs.id,
    });
    return application;
  }
}
