import { UserRepository } from "./repositories/users/database";
import { Module } from "@nestjs/common";
import { UserLibService } from "./services/users";
import { AdminLibService } from "./services";
import { AdminRepository } from "./repositories";

@Module(
  {
    providers:[
      UserLibService,{
        provide: 'USER_REPOSITORY',
        useClass : UserRepository,
      },
      AdminLibService,{
        provide: 'ADMIN_REPOSITORY',
        useClass : AdminRepository
      }

    ],
    exports : [UserLibService, AdminLibService],
  }
)
export class UserLibModule {}