import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { RestController, Request, Response } from '@libs/boat';
import { Dto, Validate } from '@libs/boat/validator';
import { Role } from 'libs/common/utils/role';
import { CandidateService } from '../services/candidate';
import {
  JobsTransformer,
  ApplicationTransformer,
  UserTransformer,
} from '../transformers';
import { CanAccess } from '../decorators';
import { IdParamDto } from '../dto';

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
      inputs.id,
    );
    return res.success(
      await this.transform(result, new ApplicationTransformer(), {}),
    );
  }
}
