import { RepositoryContract } from "@libs/database";
import { IUser } from "libs/common/interfaces/user";

export interface UserRepositoryContract
  extends RepositoryContract<IUser> {
    // async searc()
  }