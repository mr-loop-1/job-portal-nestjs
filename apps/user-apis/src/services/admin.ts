import { ApplicationLibService } from '@lib/users/services/applications';
import { JobLibService, UserLibService } from '@lib/users';
import { Injectable } from '@nestjs/common';
import { Pagination } from '@libs/database';
import { AppConfig, EmitEvent } from '@libs/boat';
import { IApplication, IJob, IUser } from 'libs/common/interfaces';
import {
  CANDIDATE_INACTIVED,
  JOB_INACTIVATED,
  RECRUITER_INACTIVED,
} from 'libs/common/constants';
import { DeleteUserDto, GetUsersDto, UserIdDto, JobIdDto } from '../dto';
import { UserDeletedByAdmin } from '../events';

@Injectable()
export class AdminService {
  constructor(
    private readonly jobService: JobLibService,
    private readonly applicationService: ApplicationLibService,
    private readonly userService: UserLibService,
  ) {}

  async getUsers(inputs: GetUsersDto): Promise<Pagination<IUser>> {
    const users = await this.userService.repo.search({
      role: inputs.role,
      status: AppConfig.get('settings.status.active'),
    });
    return users;
  }

  async deleteUser(inputs: DeleteUserDto): Promise<string> {
    if (inputs.role === AppConfig.get('settings.user.role.candidate')) {
      const candidate = await this.userService.repo.firstWhere({
        ulid: inputs.id,
        role: inputs.role,
      });
      await this.applicationService.repo.updateWhere(
        { candidateId: candidate.id },
        { status: AppConfig.get('settings.status.inactive') },
      );
      await this.userService.repo.updateWhere(
        { id: candidate.id },
        { status: AppConfig.get('settings.status.inactive') },
      );

      await EmitEvent(
        new UserDeletedByAdmin({
          userEmail: candidate.email,
        }),
      );

      return CANDIDATE_INACTIVED;
    } else if (inputs.role === AppConfig.get('settings.user.role.recruiter')) {
      const recruiter = await this.userService.repo.firstWhere({
        ulid: inputs.id,
        role: inputs.role,
      });
      const jobs = await this.jobService.repo.getWhere({
        recruiterId: recruiter.id,
      });
      jobs.forEach(async (job) => {
        await this.applicationService.repo.updateWhere(
          { jobId: job.id },
          { status: AppConfig.get('settings.status.inactive') },
        );
      });
      await this.jobService.repo.updateWhere(
        { recruiterId: recruiter.id },
        { status: AppConfig.get('settings.status.inactive') },
      );
      await this.userService.repo.updateWhere(
        { id: recruiter.id },
        { status: AppConfig.get('settings.status.inactive') },
      );

      await EmitEvent(
        new UserDeletedByAdmin({
          userEmail: recruiter.email,
        }),
      );

      return RECRUITER_INACTIVED;
    }
  }

  async getJobs(): Promise<Pagination<IJob>> {
    const jobs = await this.jobService.repo.search({
      eager: { recruiter: true },
      status: AppConfig.get('settings.status.active'),
    });
    return jobs;
  }

  async deleteJob(inputs: JobIdDto): Promise<string> {
    const job = await this.jobService.repo.firstWhere({ ulid: inputs.id });
    await this.applicationService.repo.updateWhere(
      { jobId: job.id },
      { status: AppConfig.get('settings.status.inactive') },
    );
    await this.jobService.repo.updateWhere(
      { id: job.id },
      { status: AppConfig.get('settings.status.inactive') },
    );
    return JOB_INACTIVATED;
  }

  async getApplications(inputs: UserIdDto): Promise<Pagination<IApplication>> {
    const candidate = await this.userService.repo.firstWhere({
      ulid: inputs.id,
    });
    const applications = await this.applicationService.repo.search({
      candidateId: candidate.id,
      status: AppConfig.get('settings.status.active'),
      eager: { job: true },
    });
    return applications;
  }
}
