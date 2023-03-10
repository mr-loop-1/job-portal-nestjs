import { AppConfig, BoatModule } from '@libs/boat';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserController } from './controllers/user';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthService } from './services/service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminController } from './controllers/admin';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
    BoatModule, 
    PassportModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],
      useFactory:async (config:ConfigService)=>config.get('auth') ,
      inject:[ConfigService]
    })
  ],
  controllers: [UserController, AdminController],
  providers: [
    AuthService, 
    LocalStrategy,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
})
export class AuthApisModule {}
