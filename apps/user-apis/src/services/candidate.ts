import { pick, random } from 'lodash';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppConfig, CacheStore, Helpers } from '@libs/boat';
import { JobLibService, UserLibService } from '@lib/users';
import {
  INCORRECT_OTP,
  JOB_APPLY_SUCCESS,
  NOT_ADMIN,
  NOT_USER,
  OTP_SENT,
  RESET_PASSWORD,
} from 'libs/common/constants';
import { CacheKeys } from 'libs/common/utils/cacheBuild';
import { IApplication, IJob, IUser } from 'libs/common/interfaces';

import { CreateJobDto } from '../dto/createJob';
import { ApplicationLibService } from '@lib/users/services/applications';
import { Pagination } from '@libs/database';

@Injectable()
export class CandidateService {
  constructor(
    private readonly userService: UserLibService,
    private readonly jobService: JobLibService,
    private readonly applicationService: ApplicationLibService,
  ) {}

  async getJobs(): Promise<Pagination<IJob>> {
    const jobs = await this.jobService.repo.search({});
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
      candidateId: user.id,
      jobId: jobId,
      status: 0,
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
