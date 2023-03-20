// import { Controller, Delete, Get, Req, Res } from '@nestjs/common';
// import { RestController, Request, Response } from '@libs/boat';
// import { Role } from 'libs/common/utils/role';
// import { CanAccess } from '../decorators/canAccess';

// @CanAccess(Role.Candidate)
// @Controller('candidate')
// export class CandidateController extends RestController {
//   constructor(private readonly adminService: AdminService) {
//     super();
//   }

//   @Get('users')
//   async getUsers(@Req() req: Request, @Res() res: Response) {
//     const result = this.adminService.getUsers()
//   }

//   @Patch('users/:id')
//   async deleteUser(@Req() req: Request, @Res() res: Response) {}

//   @Get('jobs')
//   async getJobs(@Req() req: Request, @Res() res: Response) {}

//   @Patch('jobs/:id')
//   async deleteJob(@Req() req: Request, @Res() res: Response) {}

//   @Get('/user/:id/jobs')
//   async getApplicationsById(@Req() req: Request, @Res() res: Response) {}

// }
