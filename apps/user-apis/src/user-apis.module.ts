import { Module } from '@nestjs/common';
import { UserApisController } from './user-apis.controller';
import { UserApisService } from './user-apis.service';

@Module({
  imports: [],
  controllers: [UserApisController],
  providers: [UserApisService],
})
export class UserApisModule {}
