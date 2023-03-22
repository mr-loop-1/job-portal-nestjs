import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { RestController, Request, Response } from '@libs/boat';
import { Dto, Validate } from '@libs/boat/validator';
import { Role } from 'libs/common/enums';
import { CandidateService } from '../services/candidate';
import {
  JobsTransformer,
  ApplicationTransformer,
  UserTransformer,
} from 'libs/common/transformers';
import { CanAccess } from '../decorators';
import { ApplicationIdDto, JobIdDto } from '../dto';

@CanAccess(Role.Candidate)
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

  @Get('jobs')
  async getAllJobs(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.candidateService.getJobs();
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
  @Get('applications')
  async getAllApplications(@Req() req: Request, @Res() res: Response) {
    const result = await this.candidateService.getAllApplications(req.user);
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
