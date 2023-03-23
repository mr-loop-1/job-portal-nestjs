import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { RestController, Request, Response } from '@libs/boat';
import { Dto, Validate } from '@libs/boat/validator';
import { ROLE } from 'libs/common/constants';
import { CandidateService } from '../services/candidate';
import {
  JobsTransformer,
  ApplicationTransformer,
  UserTransformer,
} from 'libs/common/transformers';
import { CanAccess, IsActive } from '../decorators';
import {
  ApplicationIdDto,
  GetApplicationsDto,
  GetJobsDto,
  JobIdDto,
} from '../dto';

@IsActive()
@CanAccess(ROLE.candidate)
@Controller('candidate')
export class CandidateController extends RestController {
  constructor(private readonly candidateService: CandidateService) {
    super();
  }

  @Get('my-profile')
  async getProfile(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.candidateService.getProfile(req.user);
    return res.success(await this.transform(result, new UserTransformer(), {}));
  }

  @Validate(GetJobsDto)
  @Get('jobs')
  async getAllJobs(
    @Dto() inputs: GetJobsDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.candidateService.getJobs(inputs);
    return res.withMeta(await this.paginate(result, new JobsTransformer(), {}));
  }

  @Validate(JobIdDto)
  @Get('jobs/:id')
  async getJobById(
    @Dto() inputs: JobIdDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.candidateService.getJobById(inputs);
    return res.success(await this.transform(result, new JobsTransformer(), {}));
  }

  @Validate(JobIdDto)
  @Post('jobs/:id/apply')
  async applyToJobById(
    @Dto() inputs: JobIdDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.candidateService.applyToJobById(req.user, inputs);
    return res.success(result);
  }

  @Validate(GetApplicationsDto)
  @Get('applications')
  async getAllApplications(
    @Dto() inputs: GetApplicationsDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.candidateService.getAllApplications(
      inputs,
      req.user,
    );
    return res.withMeta(
      await this.paginate(result, new ApplicationTransformer(), {}),
    );
  }

  @Validate(ApplicationIdDto)
  @Get('applications/:id')
  async getApplicationDetailsById(
    @Dto() inputs: ApplicationIdDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.candidateService.getApplicationDetailsById(
      inputs,
    );
    return res.success(
      await this.transform(result, new ApplicationTransformer(), {}),
    );
  }
}
