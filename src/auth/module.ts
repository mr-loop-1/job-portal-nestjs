import { Module } from '@nestjs/common';
import { AuthService } from './services';
import { UserModuleConstants } from './constants';
import { UserRepository } from './repositories';
import { GreetUser } from './commands';
import { AuthController } from '@app/auth/controllers';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    AuthService,,
    GreetUser,
    { provide: UserModuleConstants.userRepo, useClass: UserRepository },
  ],
})
export class UserModule {}
