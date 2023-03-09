import { AppConfig, BoatModule } from '@libs/boat';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AdminController } from './controllers/admin';
import { UserController } from './controllers/user';
import { LocalStrategy } from './guards/local.strategy';
import { AuthService } from './services/service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import servicesConfig from './../../../config/services';
import { ConfigModule, ConfigService } from '@nestjs/config';


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
  providers: [AuthService, LocalStrategy],
})
export class AuthApisModule {}
