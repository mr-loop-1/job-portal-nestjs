import { RepositoryContract } from "@libs/database";
import { IUser } from "libs/common/interfaces/user";

export interface UserRepositoryContract
  extends RepositoryContract<IUser> {
  /**
   * @param params 
   */
    existsUserEmail(params: string): Promise<boolean>;
  }