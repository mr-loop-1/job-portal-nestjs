import {
  Controller,
  Get,
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
import { Role, Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { JwtAuthGuard } from '../guards/jwt.guard';

@Controller('recruiter')
export class RecruiterController extends RestController {
  constructor(private readonly recruiterService: RecruiterService) {
    super();
  }

  @UseGuards(RolesGuard)
  //   @Roles(Role.Recruiter)
  @SetMetadata('role', Role.Recruiter)
  @UseGuards(JwtAuthGuard)
  @Get('jobs')
  async getJobs(@Req() req: Request, @Res() res: Response) {
    console.log('User = ', req.user);
    const result = await this.recruiterService.getJobs(req.user);
    return res.success(
      await this.transform(result, new JobsTransformer(), { req }),
    );
  }

  @Roles(Role.Recruiter)
  @SetMetadata('role', Role.Recruiter)
  @UseGuards(AuthGuard('jwt'))
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
