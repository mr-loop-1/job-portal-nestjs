import { Controller, Get, Req, Res, Patch } from '@nestjs/common';
import { RestController, Response } from '@libs/boat';
import { Role } from 'libs/common/utils/role';
import { CanAccess } from '../decorators';
import { AdminService } from '../services';
import { Dto, Validate } from '@libs/boat/validator';
import {
  ApplicationTransformer,
  JobsTransformer,
  UserTransformer,
} from '../transformers';
import { IdParamDto, UserQueryDto, DeleteUserDto } from '../dto';

@CanAccess(Role.Admin)
@Controller('candidate')
export class CandidateController extends RestController {
  constructor(private readonly adminService: AdminService) {
    super();
  }

  @Validate(UserQueryDto)
  @Get('users')
  async getUsers(
    @Dto() inputs: UserQueryDto,
    @Res() res: Response,
  ): Promise<Response> {
    const result = this.adminService.getUsers(inputs);
    return res.withMeta(await this.paginate(result, new UserTransformer(), {}));
  }

  @Validate(DeleteUserDto)
  @Patch('users/:id')
  async deleteUser(
    @Dto() inputs: DeleteUserDto,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.adminService.deleteUser(inputs);
    return res.success(result);
  }

  @Get('jobs')
  async getJobs(@Res() res: Response) {
    const result = await this.adminService.getJobs();
    return res.withMeta(await this.paginate(result, new JobsTransformer(), {}));
  }

  @Validate(IdParamDto)
  @Patch('jobs/:id')
  async deleteJob(@Dto() inputs: IdParamDto, @Res() res: Response) {
    const result = await this.adminService.deleteJob(inputs);
    return res.success(result);
  }

  @Validate(IdParamDto)
  @Get('/user/:id/jobs')
  async getApplicationsById(@Dto() inputs: IdParamDto, @Res() res: Response) {
    const result = await this.adminService.getApplications(inputs);
    return res.withMeta(
      await this.paginate(result, new ApplicationTransformer(), {}),
    );
  }
}
