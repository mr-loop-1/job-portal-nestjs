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
import { RecruiterService } from '../services/recruiter';
import { JobsTransformer } from '../transformers/jobs';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/roles';
import { JwtAuthGuard } from '../guards/jwt';
import { CanAccess } from '../decorators/canAccess';
import { ApplicationTransformer } from '../transformers/application';
import { UserTransformer } from '../transformers/user';

@Controller('recruiter')
export class RecruiterController extends RestController {
  constructor(private readonly recruiterService: RecruiterService) {
    super();
  }

  @CanAccess(1)
  @Get('jobs')
  async getJobs(@Req() req: Request, @Res() res: Response): Promise<Response> {
    const result = await this.recruiterService.getJobs(req.user);
    return res.success(
      await this.collection(result, new JobsTransformer(), { req }),
    );
  }

  @CanAccess(1)
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
    return res.success(
      await this.transform(result, new JobsTransformer(), { req }),
    );
  }

  @CanAccess(1)
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

  @CanAccess(1)
  @Get('jobs/:id/users')
  async getApplicationsByJobId(
    @Param() param,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.recruiterService.getApplicantsByJobId(param.id);
    return res.success(
      this.collection(result, new ApplicationTransformer(), { req }),
    );
  }

  @CanAccess(1)
  @Get('user/:id')
  async getUserByUserId(
    @Param() param,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.recruiterService.getUserByUserId(param.id);
    return res.success(
      await this.transform(result, new UserTransformer(), { req }),
    );
  }

  @CanAccess(1)
  @Patch('applications/:id/status') // applicationId
  async changeApplicationStatusByApplicationId(
    @Dto() inputs,
    @Param() param,
    @Res() res: Response,
  ) {
    const result = await this.recruiterService.changeStatusByApplicationId(
      inputs,
      param.id,
    );
    return res.success(result);
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
    return res.success(result);
  }

  //   @CanAccess(1)
  //   @Get('applications/:id') //? applicationId Or userId
  //   async getApplicantByApplicationId(
  //     @Param() param,
  //     @Req() req: Request,
  //     @Res() res: Response,
  //   ) {
  //     const result = await this.recruiterService.getApplicantByApplicationId(
  //       param.id,
  //     );
  //     return res.success(
  //       await this.transform(result, new ApplicationTransformer(), { req }),
  //     );
  //   }
}
