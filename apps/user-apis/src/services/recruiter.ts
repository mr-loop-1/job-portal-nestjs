import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { pick } from 'lodash';
import { JobLibService, UserLibService } from '@lib/users';
import { ApplicationLibService } from '@lib/users/services/applications';
import { Pagination } from '@libs/database';
import { Helpers } from '@libs/boat';
import {
  INVALID_CANDIDATE,
  JOB_CREATE_SUCCESS,
  JOB_UPDATE_SUCCES,
} from 'libs/common/constants';
import { IApplication, IJob, IUser } from 'libs/common/interfaces';
import { CreateJobDto } from '../dto/createJob';
import { UpdateStatusDto } from '../dto/updateStatus';

@Injectable()
export class RecruiterService {
  constructor(
    private readonly userService: UserLibService,
    private readonly jobService: JobLibService,
    private readonly applicationService: ApplicationLibService,
  ) {}

  async createJob(inputs: CreateJobDto, recruiter: IUser): Promise<string> {
    const recruiterId = recruiter.id;
    const createJob = {
      ulid: Helpers.ulid(),
      recruiterId: recruiterId,
      ...pick(inputs, ['title', 'description', 'location']),
    };
    await this.jobService.repo.create(createJob);
    return JOB_CREATE_SUCCESS;
  }

  async getJobs(recruiter: IUser): Promise<Pagination<IJob>> {
    const jobs = await this.jobService.repo.search({
      recruiterId: recruiter.id,
    });
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
        id: jobId,
        recruiterId: recruiter.id,
      },
      updateJob,
    );
    return JOB_UPDATE_SUCCES;
  }

  async getApplicantsByJobId(jobId: number): Promise<Pagination<IApplication>> {
    const applications = await this.applicationService.repo.search({
      jobId: jobId,
      eager: { candidate: true },
    });
    return applications;
  }

  async getUserByUserId(userId: number): Promise<IUser> {
    const candidate = await this.applicationService.repo.firstWhere({
      candidateId: userId,
    });
    if (!candidate) {
      throw new HttpException(INVALID_CANDIDATE, HttpStatus.FORBIDDEN);
    }
    const user = await this.userService.repo.firstWhere({
      id: userId,
    });
    return user;
  }

  async changeStatusByApplicationId(
    inputs: UpdateStatusDto,
    applicationId: string,
  ): Promise<string> {
    await this.applicationService.repo.updateWhere(
      {
        id: Number(applicationId),
      },
      { status: Number(inputs.status) },
    );
    return 'status changed succss';
  }
}
