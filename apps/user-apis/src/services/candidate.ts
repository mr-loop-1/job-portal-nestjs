import { pick, random } from 'lodash';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppConfig, CacheStore, Helpers } from '@libs/boat';
import { JobLibService, UserLibService } from '@lib/users';
import {
  INCORRECT_OTP,
  NOT_ADMIN,
  NOT_USER,
  OTP_SENT,
  RESET_PASSWORD,
} from 'libs/common/constants';
import { CacheKeys } from 'libs/common/utils/cacheBuild';
import { IApplication, IJob, IUser } from 'libs/common/interfaces';

import { CreateJobDto } from '../dto/createJob';
import { ApplicationLibService } from '@lib/users/services/applications';

@Injectable()
export class CandidateService {
  constructor(
    private readonly userService: UserLibService,
    private readonly jobService: JobLibService,
    private readonly applicationService: ApplicationLibService,
  ) {}

  async getAllJobs(): Promise<IJob[]> {
    return;
  }

  async getJobById(jobId: string): Promise<IJob> {
    return;
  }

  async applyToJobById(user: IUser, jobId: string): Promise<string> {
    return;
  }

  async getAllApplications(user: IUser): Promise<IApplication[]> {
    return;
  }

  async getApplicationDetailsById(
    applicationId: string,
  ): Promise<IApplication> {
    return;
  }

  //   async;
}
