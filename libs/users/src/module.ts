import { UserRepository } from './repositories/users/database';
import { Module } from '@nestjs/common';
import { UserLibService } from './services/users';
import { ApplicationsRepository, JobsRepository } from './repositories';
import { JobLibService } from './services/jobs';
import { ApplicationLibService } from './services/applications';

@Module({
  providers: [
    UserLibService,
    {
      provide: 'USER_REPOSITORY',
      useClass: UserRepository,
    },
    JobLibService,
    {
      provide: 'JOB_REPOSITORY',
      useClass: JobsRepository,
    },
    ApplicationLibService,
    {
      provide: 'APPLICATION_REPOSITORY',
      useClass: ApplicationsRepository,
    },
  ],
  exports: [UserLibService, JobLibService, ApplicationLibService],
})
export class UserLibModule {}
