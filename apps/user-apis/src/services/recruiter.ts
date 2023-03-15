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
import { IJob, IUser } from 'libs/common/interfaces';

import { CreateJobDto } from '../dto/createJob';

@Injectable()
export class RecruiterService {
  constructor(private readonly jobService: JobLibService) {}

  async createJob(inputs: CreateJobDto, recruiter: IUser): Promise<IJob[]> {
    const recruiterId = recruiter.id;
    const createJob = {
      uuid: Helpers.uuid(),
      recruiterId,
      ...pick(inputs, ['title', 'description', 'location']),
    };
    await this.jobService.repo.create(createJob);
    return this.getJobs(recruiter);
  }

  async getJobs(recruiter: IUser): Promise<IJob[]> {
    const jobs = this.jobService.repo.getWhere({ recruiterId: recruiter.id });
    return jobs;
  }
}
