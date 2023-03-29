import { ApplicationLibService } from '@lib/users/services/applications';
import { JobLibService, UserLibService } from '@lib/users';
import { Injectable } from '@nestjs/common';
import { Pagination } from '@libs/database';
import { AppConfig, EmitEvent } from '@libs/boat';
import { IApplication, IJob, IUser } from 'libs/common/interfaces';
import { SUCCESS } from 'libs/common/constants';
import {
  DeleteUserDto,
  GetUsersDto,
  UserIdDto,
  JobIdDto,
  GetJobsDto,
} from '../dto';
import { JobDeleted, UserDeleted } from '../events';
import { pick } from 'lodash';

@Injectable()
export class AdminService {
  constructor(
    private readonly jobService: JobLibService,
    private readonly applicationService: ApplicationLibService,
    private readonly userService: UserLibService,
  ) {}

  async getUsers(inputs: GetUsersDto): Promise<Pagination<IUser>> {
    const users = await this.userService.repo.search(
      pick(inputs, ['role', 'status', 'page', 'perPage', 'q', 'sort']),
    );
    return users;
  }

  async deleteUser(inputs: DeleteUserDto): Promise<string> {
    const user = await this.userService.repo.firstWhere({
      ulid: inputs.id,
    });

    await EmitEvent(
      new UserDeleted({
        user,
      }),
    );

    return SUCCESS.USER_INACTIVATED;
  }

  async getJobs(inputs: GetJobsDto): Promise<Pagination<IJob>> {
    let user;
    if (inputs?.userId) {
      user = await this.userService.repo.firstWhere({
        ulid: inputs.userId,
      });
    }
    const jobs = await this.jobService.repo.search({
      ...pick(inputs, ['status', 'page', 'perPage', 'q', 'sort']),
      eager: { recruiter: true },
      recruiterId: user?.id,
    });
    return jobs;
  }

  async deleteJob(inputs: JobIdDto): Promise<string> {
    const job = await this.jobService.repo.firstWhere({ ulid: inputs.id });
    await EmitEvent(
      new JobDeleted({
        job,
      }),
    );
    return SUCCESS.JOB_INACTIVATED;
  }

  async getApplications(inputs: UserIdDto): Promise<Pagination<IApplication>> {
    let candidate;
    if (inputs?.userId) {
      candidate = await this.userService.repo.firstWhere({
        ulid: inputs.userId,
        role: AppConfig.get('settings.status.active'),
      });
    }
    const applications = await this.applicationService.repo.search({
      candidateId: candidate?.id,
      ...pick(inputs, ['status', 'page', 'perPage']),
      eager: { job: true, candidate: true },
    });
    return applications;
  }
}
