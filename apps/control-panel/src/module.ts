import { BoatModule } from '@libs/boat';
import { Module } from '@nestjs/common';
import { ControlPanelController } from './controller';

@Module({
  imports: [BoatModule],
  controllers: [ControlPanelController],
  providers: [],
})
export class AppModule {}
