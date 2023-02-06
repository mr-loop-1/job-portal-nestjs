import { Module } from '@nestjs/common';
import { UserController } from './controllers';
import { UserService } from './services';
import { UserModuleConstants } from './constants';
import { UserRepository } from './repositories';
import { GreetUser } from './commands';
import { AuthController } from '@app/auth/controllers';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserService,,
    GreetUser,
    { provide: UserModuleConstants.userRepo, useClass: UserRepository },
  ],
})
export class UserModule {}
