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
import { EventListeners } from './listeners';
import {
  CandidateNotificationService,
  RecruiterNotificationService,
} from './jobs/mailService';

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
  controllers: [RecruiterController, CandidateController],
  providers: [
    RecruiterService,
    CandidateService,
    JwtStrategy,
    EventListeners,
    CandidateNotificationService,
    RecruiterNotificationService,
  ],
})
export class UserApisModule {}
