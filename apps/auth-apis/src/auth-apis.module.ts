import { Module } from '@nestjs/common';
import { AdminController } from './controllers/admin.controller';
import { UserController } from './controllers/user.controller';
import { AuthService } from './services/auth.service';

@Module({
  imports: [],
  controllers: [AdminController, UserController],
  providers: [AuthService],
})
export class AuthApisModule {}
