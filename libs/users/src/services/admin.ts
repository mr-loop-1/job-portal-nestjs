import { Injectable, Inject } from '@nestjs/common';
import { AdminLibConstants } from '../constant';
import { AdminRepositoryContract } from '../repositories/admin/contract';

@Injectable()
export class AdminLibService {
  constructor(
    @Inject(AdminLibConstants.ADMIN_REPOSITORY)
    public readonly repo: AdminRepositoryContract,
  ) {}
}
