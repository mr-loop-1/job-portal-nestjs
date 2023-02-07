import { UserRepository } from "./repositories/users/database";
import { Module } from "@nestjs/common";
import { UserLibService } from "./services/users";

@Module(
  {
    providers:[
      UserLibService,{
        provide: 'USER_REPOSITORY',
        useClass : UserRepository,
      },

    ],
    exports : [UserLibService],
  }
)
export class UserLibModule {}