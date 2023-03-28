import {
  Controller,
  Get,
  HttpStatus,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { RestController, Request, Response } from '@libs/boat';
import { Dto, Validate } from '@libs/boat/validator';
import { ROLE } from 'libs/common/constants';
import {
  CreateJobDto,
  UpdateJobDto,
  UpdateStatusDto,
  CandidateIdDto,
  JobIdDto,
  GetJobsDto,
} from '../dto';
import { RecruiterService } from '../services';
import {
  JobsTransformer,
  UserTransformer,
  ApplicationTransformer,
} from 'libs/common/transformers';
import { CanAccess } from '../decorators';

@CanAccess(ROLE.recruiter)
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

  @Validate(GetJobsDto)
  @Get('jobs')
  async getJobs(
    @Dto() inputs: GetJobsDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.recruiterService.getJobs(inputs, req.user);
    return res.withMeta(
      await this.paginate(result, new JobsTransformer(), { req }),
    );
  }

  @Validate(JobIdDto)
  @Get('jobs/:id/users')
  async getApplicationsByJobId(
    @Dto() inputs: JobIdDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.recruiterService.getApplicantsByJobId(inputs);
    return res.withMeta(
      await this.paginate(result, new ApplicationTransformer(), { req }),
    );
  }

  @Validate(JobIdDto)
  @Get('jobs/:id')
  async getJobById(
    @Dto() inputs: JobIdDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.recruiterService.getJobById(req.user, inputs);
    return res.success(await this.transform(result, new JobsTransformer(), {}));
  }

  @Validate(UpdateJobDto)
  @Patch('jobs/:id')
  async changeJobById(
    @Dto() inputs: UpdateJobDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.recruiterService.changeJobById(req.user, inputs);
    return res.success(result);
  }

  @Validate(CandidateIdDto)
  @Get('users/:id')
  async getUserByUserId(@Dto() inputs: CandidateIdDto, @Res() res: Response) {
    const result = await this.recruiterService.getUserByUserId(inputs);
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
