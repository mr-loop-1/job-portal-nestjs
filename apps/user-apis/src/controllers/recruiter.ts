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
import { IdParamDto } from '../dto/idParam';

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

  @Validate(IdParamDto)
  @Get('jobs/:id/users')
  async getApplicationsByJobId(
    @Dto() param: IdParamDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.recruiterService.getApplicantsByJobId(param.id);
    return res.withMeta(
      await this.paginate(result, new ApplicationTransformer(), { req }),
    );
  }

  @Validate(IdParamDto)
  @Get('jobs/:id')
  async getJobById(
    @Dto() param: IdParamDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    console.log(req);
    const result = await this.recruiterService.getJobById(req.user, param.id);
    return res.success(await this.transform(result, new JobsTransformer(), {}));
  }

  @Validate(IdParamDto)
  @Validate(CreateJobDto)
  @Patch('jobs/:id')
  async changeJobById(
    @Dto() inputs: CreateJobDto,
    @Dto() param: IdParamDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.recruiterService.changeJobById(
      req.user,
      inputs,
      param.id,
    );
    return res.success(result);
  }

  @Validate(IdParamDto)
  @Get('users/:id')
  async getUserByUserId(
    @Dto() param: IdParamDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.recruiterService.getUserByUserId(param.id);
    return res.success(await this.transform(result, new UserTransformer(), {}));
  }

  @Validate(IdParamDto)
  @Validate(UpdateStatusDto)
  @Patch('applications/:id/status')
  async changeStatusByApplicationId(
    @Dto() inputs: UpdateStatusDto,
    @Dto() param: IdParamDto,
    @Res() res: Response,
  ) {
    const result = await this.recruiterService.changeStatusByApplicationId(
      inputs,
      param.id,
    );
    return res.success(
      await this.transform(result, new ApplicationTransformer(), {}),
    );
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
