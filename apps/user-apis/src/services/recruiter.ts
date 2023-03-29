import { pick } from 'lodash';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ApplicationLibService } from '@lib/users/services/applications';
import { JobLibService, UserLibService } from '@lib/users';
import { Pagination } from '@libs/database';
import { AppConfig, Helpers } from '@libs/boat';
import { ERROR, SUCCESS } from 'libs/common/constants';
import { IApplication, IJob, IUser } from 'libs/common/interfaces';
import {
  ApplicationIdDto,
  JobIdDto,
  UpdateJobDto,
  CandidateIdDto,
  CreateJobDto,
  UpdateStatusDto,
  GetJobsDto,
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
    return SUCCESS.JOB_CREATE_SUCCESS;
  }

  async getJobs(
    inputs: GetJobsDto,
    recruiter: IUser,
  ): Promise<Pagination<IJob>> {
    const jobs = await this.jobService.repo.search({
      recruiterId: recruiter.id,
      ...pick(inputs, ['page', 'perPage', 'q', 'sort']),
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
    const result = await this.jobService.repo.updateWhere(
      {
        ulid: inputs.id,
        recruiterId: recruiter.id,
      },
      updateJob,
    );
    if (!result) {
      throw new HttpException(ERROR.JOB_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return SUCCESS.JOB_UPDATE_SUCCES;
  }

  async getApplicantsByJobId(
    inputs: JobIdDto,
  ): Promise<Pagination<IApplication>> {
    const jobs = await this.jobService.repo.firstWhere({ ulid: inputs.id });
    const applications = await this.applicationService.repo.search({
      jobId: jobs.id,
      eager: { candidate: true },
      status: AppConfig.get('settings.status.active'),
    });
    return applications;
  }

  async getUserByUserId(inputs: CandidateIdDto): Promise<IUser> {
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
