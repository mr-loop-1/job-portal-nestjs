import { Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { RestController, Request, Response } from '@libs/boat';
import { Role } from 'libs/common/utils/role';
import { CandidateService } from '../services/candidate';
import { JobsTransformer } from '../transformers/jobs';
import { CanAccess } from '../decorators/canAccess';
import { ApplicationTransformer } from '../transformers/application';
import { IdParamDto } from '../dto/idParam';
import { Validate } from '@libs/boat/validator';

@CanAccess(Role.Candidate)
@Controller('candidate')
export class CandidateController extends RestController {
  constructor(private readonly candidateService: CandidateService) {
    super();
  }

  @Get('jobs')
  async getAllJobs(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.candidateService.getJobs();
    return res.withMeta(await this.paginate(result, new JobsTransformer(), {}));
  }

  @Validate(IdParamDto)
  @Get('jobs/:id')
  async getJobById(
    @Param() param: IdParamDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.candidateService.getJobById(param.id);
    return res.success(await this.transform(result, new JobsTransformer(), {}));
  }

  @Validate(IdParamDto)
  @Post('jobs/:id/apply')
  async applyToJobById(
    @Param() param: IdParamDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.candidateService.applyToJobById(
      req.user,
      param.id,
    );
    return res.success(result);
  }
  @Get('applications')
  async getAllApplications(@Req() req: Request, @Res() res: Response) {
    const result = await this.candidateService.getAllApplications(req.user);
    return res.withMeta(
      await this.paginate(result, new ApplicationTransformer(), {}),
    );
  }

  @Validate(IdParamDto)
  @Get('applications/:id')
  async getApplicationDetailsById(
    @Param() param: IdParamDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.candidateService.getApplicationDetailsById(
      req.user,
      param.id,
    );
    return res.success(
      await this.transform(result, new ApplicationTransformer(), {}),
    );
  }
}
