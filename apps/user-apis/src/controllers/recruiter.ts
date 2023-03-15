import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { RestController, Request, Response } from '@libs/boat';
import { Dto, Validate } from '@libs/boat/validator';
import { CreateJobDto } from '../dto/createJob';
import { RecruiterService } from '../services/recruiter';
import { JobsTransformer } from '../transformers/jobs';
import { AuthGuard } from '@nestjs/passport';
import { Role, Roles } from '../decorators/roles.decorator';

@Controller('recruiter')
export class AdminController extends RestController {
  constructor(private readonly recruiterService: RecruiterService) {
    super();
  }

  @Roles(Role.Recruiter)
  @UseGuards(AuthGuard('jwt'))
  @Get('jobs')
  async getJobs(@Req() req: Request, @Res() res: Response) {
    const result = await this.recruiterService.getJobs(req.user);
    return res.success(
      await this.transform(result, new JobsTransformer(), { req }),
    );
  }

  @UseGuards()
  @Validate(CreateJobDto)
  @Post('job')
  async createJob(
    @Dto() inputs: CreateJobDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.recruiterService.createJob(inputs, req.user);
    return res.success(
      await this.transform(result, new JobsTransformer(), { req }),
    );
  }
}
