import { BoatModule } from '@libs/boat';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserController } from './controllers/user';
import { AuthService } from './services/service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminController } from './controllers/admin';
import { UserLibModule } from '@lib/users';

@Module({
  imports: [
    BoatModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => config.get('auth'),
      inject: [ConfigService],
    }),
    UserLibModule,
  ],
  controllers: [UserController, AdminController],
  providers: [AuthService],
})
export class AuthApisModule {}
