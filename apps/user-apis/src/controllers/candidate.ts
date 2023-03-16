import {
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { RestController, Request, Response, ConsoleExplorer } from '@libs/boat';
import { Dto, Validate } from '@libs/boat/validator';
import { CreateJobDto } from '../dto/createJob';
import { CandidateService } from '../services/candidate';
import { JobsTransformer } from '../transformers/jobs';
import { CanAccess } from '../decorators/canAccess';
import { ApplicationTransformer } from '../transformers/application';
import { UserTransformer } from '../transformers/user';
import { Role } from 'libs/common/utils/role';

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

  @Get('jobs/:id')
  async getJobById(
    @Param() param,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.candidateService.getJobById(Number(param.id));
    return res.success(await this.transform(result, new JobsTransformer(), {}));
  }

  @Post('jobs/:id/apply')
  async applyToJobById(
    @Param() param,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.candidateService.applyToJobById(
      req.user,
      Number(param.id),
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
  @Get('applications/:id')
  async getApplicationDetailsById(
    @Param() param,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.candidateService.getApplicationDetailsById(
      req.user,
      Number(param.id),
    );
    return res.success(
      await this.transform(result, new ApplicationTransformer(), {}),
    );
  }
}
