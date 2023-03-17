import { Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { RestController, Request, Response } from '@libs/boat';
import { Role } from 'libs/common/utils/role';
import { CandidateService } from '../services/candidate';
import { JobsTransformer } from '../transformers/jobs';
import { CanAccess } from '../decorators/canAccess';
import { ApplicationTransformer } from '../transformers/application';
import { IdParamDto } from '../dto/idParam';
import { Dto, Validate } from '@libs/boat/validator';

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
    @Dto() inputs: IdParamDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.candidateService.getJobById(inputs.id);
    return res.success(await this.transform(result, new JobsTransformer(), {}));
  }

  @Validate(IdParamDto)
  @Post('jobs/:id/apply')
  async applyToJobById(
    @Dto() inputs: IdParamDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.candidateService.applyToJobById(
      req.user,
      inputs.id,
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
    @Dto() inputs: IdParamDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.candidateService.getApplicationDetailsById(
      req.user,
      inputs.id,
    );
    return res.success(
      await this.transform(result, new ApplicationTransformer(), {}),
    );
  }
}
