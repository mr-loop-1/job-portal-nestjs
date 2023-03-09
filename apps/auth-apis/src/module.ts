import { BoatModule } from '@libs/boat';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AdminController } from './controllers/admin';
import { UserController } from './controllers/user';
import { LocalStrategy } from './guards/local.strategy';
import { AuthService } from './services/service';

@Module({
  imports: [BoatModule, PassportModule],
  controllers: [UserController, AdminController],
  providers: [AuthService, LocalStrategy],
})
export class AuthApisModule {}
