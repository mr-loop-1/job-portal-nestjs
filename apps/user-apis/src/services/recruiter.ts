import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { pick } from 'lodash';
import { JobLibService, UserLibService } from '@lib/users';
import { ApplicationLibService } from '@lib/users/services/applications';
import { Pagination } from '@libs/database';
import { AppConfig, Helpers } from '@libs/boat';
import {
  JOB_CREATE_SUCCESS,
  JOB_NOT_FOUND,
  JOB_UPDATE_SUCCES,
} from 'libs/common/constants';
import { IApplication, IJob, IUser } from 'libs/common/interfaces';
import { CreateJobDto } from '../dto/createJob';
import { UpdateStatusDto } from '../dto/updateStatus';
import { IdParamDto, UpdateJobDto } from '../dto';

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

  async getJobById(recruiter: IUser, inputs: IdParamDto): Promise<IJob> {
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
      throw new HttpException(JOB_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return JOB_UPDATE_SUCCES;
  }

  async getApplicantsByJobId(
    inputs: IdParamDto,
  ): Promise<Pagination<IApplication>> {
    const jobs = await this.jobService.repo.firstWhere({ ulid: inputs.id });
    const applications = await this.applicationService.repo.search({
      jobId: jobs.id,
      eager: { candidate: true },
    });
    return applications;
  }

  async getUserByUserId(inputs: IdParamDto): Promise<IUser> {
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
