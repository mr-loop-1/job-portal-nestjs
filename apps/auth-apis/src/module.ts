import { AppConfig, BoatModule } from '@libs/boat';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserController } from './controllers/user';
import { LocalStrategy } from './guards/local.strategy';
import { AuthService } from './services/service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './guards/jwt.strategy';
import { AdminController } from './controllers/admin';

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
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthApisModule {}
