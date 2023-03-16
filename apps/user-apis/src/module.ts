import { BoatModule } from '@libs/boat';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RecruiterController } from './controllers/recruiter';
import { RecruiterService } from './services/recruiter';
import { UserLibModule } from '@lib/users';
import { JwtStrategy } from './strategy/jwt.strategy';

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
  controllers: [RecruiterController],
  providers: [RecruiterService, JwtStrategy],
})
export class UserApisModule {}
