import { UserRepository } from './repositories/users/database';
import { Module } from '@nestjs/common';
import { UserLibService } from './services/users';
import { JobsRepository } from './repositories';
import { JobLibService } from './services/jobs';

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
  ],
  exports: [UserLibService, JobLibService],
})
export class UserLibModule {}
