import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JobLibService, UserLibService } from '@lib/users';
import { ApplicationLibService } from '@lib/users/services/applications';
import { Pagination } from '@libs/database';
import { AppConfig, EmitEvent, Helpers } from '@libs/boat';
import { IApplication, IJob, IUser } from 'libs/common/interfaces';
import {
  ALREADY_APPLIED,
  CANDIDATE_INACTIVED,
  JOB_APPLY_SUCCESS,
  RECRUITER_INACTIVED,
} from 'libs/common/constants';
import { JobAppliedByCandidate } from '../events/applyJob';
import { DeleteUserDto, IdParamDto, UserQueryDto } from '../dto';

@Injectable()
export class AdminService {
  constructor(
    private readonly jobService: JobLibService,
    private readonly applicationService: ApplicationLibService,
    private readonly userService: UserLibService,
  ) {}

  async getUsers(inputs: UserQueryDto): Promise<Pagination<IUser>> {
    const users = await this.userService.repo.search({
      role: inputs.role,
    });
    return users;
  }

  async deleteUser(inputs: DeleteUserDto): Promise<string> {
    if (inputs.role === AppConfig.get('settings.role[0]')) {
      await this.applicationService.repo.updateWhere(
        { candidateId: inputs.id },
        { status: AppConfig.get('settings.status.inactive') },
      );

      await this.userService.repo.updateWhere(
        { id: inputs.id },
        { status: AppConfig.get('settings.status.inactive') },
      );

      return CANDIDATE_INACTIVED;
    } else if (inputs.role === AppConfig.get('settings.role[1]')) {
      const jobs = await this.jobService.repo.getWhere({
        recruiterId: inputs.id,
      });
      jobs.forEach(async (job) => {
        await this.applicationService.repo.updateWhere(
          { jobId: job.id },
          { status: AppConfig.get('settings.status.inactive') },
        );
      });
      await this.jobService.repo.updateWhere(
        { recruiterId: inputs.id },
        { status: AppConfig.get('settings.status.inactive') },
      );
      await this.userService.repo.updateWhere(
        { id: inputs.id },
        { status: AppConfig.get('settings.status.inactive') },
      );

      return RECRUITER_INACTIVED;
    }
  }

  async getJobs(): Promise<Pagination<IJob>> {
    const jobs = await this.jobService.repo.search({
      eager: { recruiter: true },
    });
    return jobs;
  }

  async deleteJob(inputs: IdParamDto): Promise<string> {
    await this.applicationService.repo.updateWhere(
      { jobId: inputs.id },
      { status: AppConfig.get('settings.status.inactive') },
    );
    await this.jobService.repo.updateWhere(
      { id: inputs.id },
      { status: AppConfig.get('settings.status.inactive') },
    );
    return;
  }

  async getApplications(inputs: IdParamDto): Promise<Pagination<IApplication>> {
    const applications = await this.applicationService.repo.search({
      candidateId: inputs.id,
      eager: { job: true },
    });
    return applications;
  }
}
