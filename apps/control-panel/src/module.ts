import { UserLibModule, UserLibService } from '@lib/users';
import { BoatModule } from '@libs/boat';
import { Module } from '@nestjs/common';
import { CreateAdmin } from './commands/createAdmin';
import { ControlPanelController } from './controller';

@Module({
  imports: [BoatModule, UserLibModule],
  controllers: [ControlPanelController],
  providers: [CreateAdmin],
})
export class AppModule {}
