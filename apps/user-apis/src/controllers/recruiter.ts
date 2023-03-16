import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { RestController, Request, Response, ConsoleExplorer } from '@libs/boat';
import { Dto, Validate } from '@libs/boat/validator';
import { CreateJobDto } from '../dto/createJob';
import { RecruiterService } from '../services/recruiter';
import { JobsTransformer } from '../transformers/jobs';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/roles';
import { JwtAuthGuard } from '../guards/jwt';
import { CanAccess } from '../decorators/canAccess';

@Controller('recruiter')
export class RecruiterController extends RestController {
  constructor(private readonly recruiterService: RecruiterService) {
    super();
  }

  @CanAccess(1)
  @Get('jobs')
  async getJobs(@Req() req: Request, @Res() res: Response) {
    const result = await this.recruiterService.getJobs(req.user);
    return res.success(
      await this.transform(result, new JobsTransformer(), { req }),
    );
  }

  @CanAccess(1)
  @Get('jobs/:id')
  async getJobById(@Param() param, @Req() req: Request, @Res() res: Response) {
    const result = await this.recruiterService.getJobBYId(req.user, param.id);
    return res.success(
      await this.transform(result, new JobsTransformer(), { req }),
    );
  }

  @CanAccess(1)
  @Get('jobs/:id/users')
  async getUserApplicationsByJobId(
    @Param() param,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.recruiterService.getUserApplicationsByJobId(
      req.user,
      param.id,
    );
    return res.success(
      await this.transform(result, new JobsTransformer(), { req }),
    );
  }

  @CanAccess(1)
  @Validate(CreateJobDto)
  @Post('job')
  async createJob(
    @Dto() inputs: CreateJobDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    console.log(req);
    const result = await this.recruiterService.createJob(inputs, req.user);
    return res.success(
      await this.transform(result, new JobsTransformer(), { req }),
    );
  }
}
