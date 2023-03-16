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
export class RecruiterService {
  constructor(
    private readonly jobService: JobLibService,
    private readonly applicationService: ApplicationLibService,
  ) {}

  async createJob(inputs: CreateJobDto, recruiter: IUser): Promise<string> {
    const recruiterId = recruiter.id;
    const createJob = {
      uuid: Helpers.uuid(),
      recruiterId,
      ...pick(inputs, ['title', 'description', 'location']),
    };
    await this.jobService.repo.create(createJob);
    return 'Job added successfully';
  }

  async getJobs(recruiter: IUser): Promise<IJob[]> {
    const jobs = await this.jobService.repo.searchAll(recruiter.id);
    console.log('successs');
    return jobs;
  }

  async getJobById(recruiter: IUser, jobId: number): Promise<IJob> {
    const job = await this.jobService.repo.firstWhere({
      recruiterId: recruiter.id,
      id: jobId,
    });
    return job;
  }

  async changeJobById(
    recruiter: IUser,
    inputs: IJob,
    jobId: number,
  ): Promise<string> {
    const updateJob = pick(inputs, ['title', 'description', 'location']);
    await this.jobService.repo.updateWhere(
      {
        recruiterId: recruiter.id,
        id: jobId,
      },
      updateJob,
    );
    return 'Job update success';
  }

  async getApplicantsByJobId(jobId: number): Promise<IApplication[]> {
    const applications = await this.applicationService.repo.getWhere({
      jobId: jobId,
    });
    return applications;
  }

  async getUserByUserId(userId): Promise<IUser> {
    const candidate = await this.applicationService.repo.firstWhere({
      //   jobId: jobId,
    });
    return candidate;
  }

  async changeStatusByApplicationId(
    inputs: any,
    applicationId: string,
  ): Promise<string> {
    // applicationId = Number(applicationId);
    return 'status changed succss';
  }

  //   async getApplicantByApplicationId(applicantId): Promise<IApplication> {
  //     const applicants = await this.applicationService.repo.firstWhere({
  //       //   jobId: jobId,
  //     });
  //     return applicants;
  //   }
}
