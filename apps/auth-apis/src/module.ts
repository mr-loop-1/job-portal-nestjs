import { BoatModule } from '@libs/boat';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
// import { AdminController } from './controllers/admin.controller';
import { UserController } from './controllers/user';
// import { LocalStrategy } from './local.strategy';
// import { AuthService } from './services/auth.service';

@Module({
  imports: [BoatModule],
  controllers: [UserController],
  providers: [],
})
export class AuthApisModule {}
