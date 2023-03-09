import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AdminController } from './controllers/admin.controller';
import { UserController } from './controllers/user.controller';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './services/auth.service';

@Module({
  imports: [],
  controllers: [UserController, PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthApisModule {}
