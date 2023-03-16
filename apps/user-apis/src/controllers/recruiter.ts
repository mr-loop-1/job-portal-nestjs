import { Controller, Get, Param, Patch, Post, Req, Res } from '@nestjs/common';
import { RestController, Request, Response } from '@libs/boat';
import { Dto, Validate } from '@libs/boat/validator';
import { CreateJobDto } from '../dto/createJob';
import { RecruiterService } from '../services/recruiter';
import { JobsTransformer } from '../transformers/jobs';
import { CanAccess } from '../decorators/canAccess';
import { ApplicationTransformer } from '../transformers/application';
import { UserTransformer } from '../transformers/user';
import { UpdateStatusDto } from '../dto/updateStatus';
import { Role } from 'libs/common/utils/role';

@CanAccess(Role.Recruiter)
@Controller('recruiter')
export class RecruiterController extends RestController {
  constructor(private readonly recruiterService: RecruiterService) {
    super();
  }

  @Get('jobs')
  async getJobs(@Req() req: Request, @Res() res: Response): Promise<Response> {
    const result = await this.recruiterService.getJobs(req.user);
    return res.withMeta(
      await this.paginate(result, new JobsTransformer(), { req }),
    );
  }

  @Get('jobs/:id/users')
  async getApplicationsByJobId(
    @Param() param,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.recruiterService.getApplicantsByJobId(param.id);
    console.log(result);
    return res.withMeta(
      await this.paginate(result, new ApplicationTransformer(), {}),
    );
  }

  @Get('jobs/:id')
  async getJobById(
    @Param() param,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.recruiterService.getJobById(
      req.user,
      Number(param.id),
    );
    return res.success(await this.transform(result, new JobsTransformer(), {}));
  }

  @Validate(CreateJobDto)
  @Patch('jobs/:id')
  async changeJobById(
    @Dto() inputs: CreateJobDto,
    @Param() param,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.recruiterService.changeJobById(
      req.user,
      inputs,
      Number(param.id),
    );
    return res.success(result);
  }

  @Get('users/:id')
  async getUserByUserId(
    @Param() param,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.recruiterService.getUserByUserId(param.id);
    return res.success(await this.transform(result, new UserTransformer(), {}));
  }

  @Validate(UpdateStatusDto)
  @Patch('applications/:id/status')
  async changeApplicationStatusByApplicationId(
    @Dto() inputs: UpdateStatusDto,
    @Param() param,
    @Res() res: Response,
  ) {
    const result = await this.recruiterService.changeStatusByApplicationId(
      inputs,
      param.id,
    );
    return res.success(result);
  }

  @Validate(CreateJobDto)
  @Post('job')
  async createJob(
    @Dto() inputs: CreateJobDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.recruiterService.createJob(inputs, req.user);
    return res.success(result);
  }
}
