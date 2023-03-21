import { Controller, Get, Patch, Post, Req, Res } from '@nestjs/common';
import { RestController, Request, Response } from '@libs/boat';
import { Dto, Validate } from '@libs/boat/validator';
import { Role } from 'libs/common/utils/role';
import {
  CreateJobDto,
  UpdateJobDto,
  UpdateStatusDto,
  IdParamDto,
} from '../dto';
import { RecruiterService } from '../services';
import {
  JobsTransformer,
  UserTransformer,
  ApplicationTransformer,
} from '../transformers';
import { CanAccess } from '../decorators';

@CanAccess(Role.Recruiter)
@Controller('recruiter')
export class RecruiterController extends RestController {
  constructor(private readonly recruiterService: RecruiterService) {
    super();
  }

  @Get('my-profile')
  async getProfile(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.recruiterService.getProfile(req.user);
    return res.success(await this.transform(result, new UserTransformer(), {}));
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
    @Dto() inputs: IdParamDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.recruiterService.getApplicantsByJobId(inputs.id);
    return res.withMeta(
      await this.paginate(result, new ApplicationTransformer(), { req }),
    );
  }

  @Validate(IdParamDto)
  @Get('jobs/:id')
  async getJobById(
    @Dto() inputs: IdParamDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.recruiterService.getJobById(req.user, inputs.id);
    return res.success(await this.transform(result, new JobsTransformer(), {}));
  }

  @Validate(UpdateJobDto)
  @Patch('jobs/:id')
  async changeJobById(
    @Dto() inputs: CreateJobDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.recruiterService.changeJobById(req.user, inputs);
    return res.success(result);
  }

  @Validate(IdParamDto)
  @Get('users/:id')
  async getUserByUserId(@Dto() param: IdParamDto, @Res() res: Response) {
    const result = await this.recruiterService.getUserByUserId(param.id);
    return res.success(await this.transform(result, new UserTransformer(), {}));
  }

  @Validate(UpdateStatusDto)
  @Patch('applications/:id/status')
  async changeStatusByApplicationId(
    @Dto() inputs: UpdateStatusDto,
    @Res() res: Response,
  ) {
    const result = await this.recruiterService.changeStatusByApplicationId(
      inputs,
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
