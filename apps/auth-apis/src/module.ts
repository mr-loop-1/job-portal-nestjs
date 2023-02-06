import { BoatModule } from '@libs/boat';
import { Module } from '@nestjs/common';
import { UserApiController } from './controllers';
import { UserApisService } from './services';


@Module({
  imports: [
    BoatModule
  ],
  controllers: [UserApiController],
  providers: [UserApisService],
})
export class AuthApisModule {}
