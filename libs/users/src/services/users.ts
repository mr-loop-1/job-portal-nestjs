import { Injectable, Inject } from '@nestjs/common';
import { UserLibConstants } from '../constant';
import { UserRepositoryContract } from '../repositories/users/contract';

@Injectable()
export class UserLibService {
  constructor(
    @Inject(UserLibConstants.USER_REPOSITORY)
    public readonly repo: UserRepositoryContract,
  ) {}
}
