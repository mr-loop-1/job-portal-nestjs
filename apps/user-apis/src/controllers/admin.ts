import { Controller, Get, Req, Res, Patch } from '@nestjs/common';
import { RestController, Response } from '@libs/boat';
import { Role } from 'libs/common/enums';
import { CanAccess } from '../decorators';
import { AdminService } from '../services';
import { Dto, Validate } from '@libs/boat/validator';
import {
  ApplicationTransformer,
  JobsTransformer,
  UserTransformer,
} from 'libs/common/transformers';
import { IdDto, DeleteUserDto, GetUsersDto } from '../dto';

@CanAccess(Role.Admin)
@Controller('admin')
export class AdminController extends RestController {
  constructor(private readonly adminService: AdminService) {
    super();
  }

  @Validate(GetUsersDto)
  @Get('users')
  async getUsers(
    @Dto() inputs: GetUsersDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.adminService.getUsers(inputs);
    return res.withMeta(
      await this.paginate(result, new UserTransformer(), { req }),
    );
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

  @Validate(IdDto)
  @Get('/user/:id/jobs')
  async getApplicationsById(@Dto() inputs: IdDto, @Res() res: Response) {
    const result = await this.adminService.getApplications(inputs);
    return res.withMeta(
      await this.paginate(result, new ApplicationTransformer(), {}),
    );
  }

  @Validate(IdDto)
  @Patch('jobs/:id')
  async deleteJob(@Dto() inputs: IdDto, @Res() res: Response) {
    const result = await this.adminService.deleteJob(inputs);
    return res.success(result);
  }
}
