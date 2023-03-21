import { BoatModule } from '@libs/boat';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserController } from './controllers/user';
import { AuthService } from './services/service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminController } from './controllers/admin';
import { UserLibModule } from '@lib/users';
import {
  UserForgotNotificationService,
  UserRegsiterNotificationService,
  UserResetNotificationService,
} from './jobs/mailService';
import { MailmanModule } from '@squareboat/nest-mailman';
import mail from '@config/mail';
import { PasswordEventListener, UserRegisterEventListener } from './listeners';

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
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [mail],
    }),
    MailmanModule.registerAsync({
      imports: [ConfigService],
      useFactory: (config: ConfigService) => {
        return config.get('mailman');
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController, AdminController],
  providers: [
    AuthService,
    PasswordEventListener,
    UserRegisterEventListener,
    UserForgotNotificationService,
    UserResetNotificationService,
    UserRegsiterNotificationService,
  ],
})
export class AuthApisModule {}
