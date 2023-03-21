import { Module } from '@nestjs/common';
import {
  UserRepository,
  ApplicationsRepository,
  JobsRepository,
} from './repositories';
import {
  ApplicationLibService,
  JobLibService,
  UserLibService,
} from './services';

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
