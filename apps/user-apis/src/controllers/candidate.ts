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
  // constructor(private readonly candidateService: CandidateService) {
  //   super();
  // }
  // @Get('jobs')
  // async getAllJobs(
  //   @Req() req: Request,
  //   @Res() res: Response,
  // ): Promise<Response> {
  //   const result = await this.candidateService.getAllJobs();
  //   return res.success(
  //     await this.collection(result, new JobsTransformer(), { req }),
  //   );
  // }
  // @CanAccess(1)
  // @Get('jobs/:id')
  // async getJobById(
  //   @Param() param,
  //   @Req() req: Request,
  //   @Res() res: Response,
  // ): Promise<Response> {
  //   const result = await this.candidateService.getJobById(param.id);
  //   return res.success(
  //     await this.transform(result, new JobsTransformer(), { req }),
  //   );
  // }
  // @CanAccess(1)
  // // @Validate()
  // @Post('jobs/:id/apply')
  // async applyToJobById(
  //   @Param() param,
  //   @Req() req: Request,
  //   @Res() res: Response,
  // ): Promise<Response> {
  //   const result = await this.candidateService.applyToJobById(
  //     req.user,
  //     param.id,
  //   );
  //   return res.success(result);
  // }
  // @CanAccess(1)
  // @Get('applications')
  // async getAllApplications(@Req() req: Request, @Res() res: Response) {
  //   const result = await this.candidateService.getAllApplications(req.user);
  //   return res.success(
  //     this.collection(result, new ApplicationTransformer(), { req }),
  //   );
  // }
  // @CanAccess(1)
  // @Get('user/:id')
  // async getApplicationDetailsById(
  //   @Param() param,
  //   @Req() req: Request,
  //   @Res() res: Response,
  // ) {
  //   const result = await this.candidateService.getApplicationDetailsById(
  //     param.id,
  //   );
  //   return res.success(
  //     await this.transform(result, new UserTransformer(), { req }),
  //   );
  // }
}
