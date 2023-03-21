import { BoatModule } from '@libs/boat';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RecruiterController } from './controllers/recruiter';
import { RecruiterService } from './services/recruiter';
import { UserLibModule } from '@lib/users';
import { JwtStrategy } from './strategy/jwt.strategy';
import { CandidateController } from './controllers/candidate';
import { CandidateService } from './services/candidate';
import mail from '@config/mail';
import { MailmanModule } from '@squareboat/nest-mailman';
import { ApplyEventListener, DeleteEventListener } from './listeners';
import {
  CandidateNotificationService,
  RecruiterNotificationService,
} from './jobs/mailService';
import { AdminService } from './services';
import { AdminController } from '@app/user-apis/controllers/admin';

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
  controllers: [RecruiterController, CandidateController, AdminController],
  providers: [
    RecruiterService,
    CandidateService,
    AdminService,
    JwtStrategy,
    ApplyEventListener,
    DeleteEventListener,
    CandidateNotificationService,
    RecruiterNotificationService,
  ],
})
export class UserApisModule {}
