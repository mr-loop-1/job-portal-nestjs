import { Injectable, Inject } from '@nestjs/common';
import { ApplicationLibConstants } from '../constant';
import { ApplicationRepositoryContract } from '../repositories';

@Injectable()
export class ApplicationLibService {
  constructor(
    @Inject(ApplicationLibConstants.APPLICATION_REPOSITORY)
    public readonly repo: ApplicationRepositoryContract,
  ) {}
}
