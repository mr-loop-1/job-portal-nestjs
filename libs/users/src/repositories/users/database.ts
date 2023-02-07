
import { Injectable } from "@nestjs/common";

import { UserRepositoryContract } from "./contract";
import { UserModel } from "./../../models/users";
import { IUser } from "libs/common/interfaces";
import { DatabaseRepository, InjectModel } from "@libs/database";

@Injectable()
export class UserRepository
  extends DatabaseRepository  <IUser>
  implements UserRepositoryContract
{
  all(inputs?: IUser): Promise<IUser[]> {
      throw new Error("Method not implemented.");
  }
  firstWhere(inputs: any, error?: boolean): Promise<IUser> {
      throw new Error("Method not implemented.");
  }
  getWhere(inputs: any, error?: boolean): Promise<IUser[]> {
      throw new Error("Method not implemented.");
  }
  create(inputs: any): Promise<IUser> {
      throw new Error("Method not implemented.");
  }
  createOrUpdate(conditions: any, values: any): Promise<IUser> {
      throw new Error("Method not implemented.");
  }
  firstOrNew(conditions: any, values: any): Promise<IUser> {
      throw new Error("Method not implemented.");
  }
  update(model: IUser, setValues: any): Promise<number> {
      throw new Error("Method not implemented.");
  }
  updateWhere(where: any, setValues: any): Promise<number> {
      throw new Error("Method not implemented.");
  }
  exists(params: IUser): Promise<boolean> {
      throw new Error("Method not implemented.");
  }
  count(params: IUser): Promise<number> {
      throw new Error("Method not implemented.");
  }
  refresh(model: IUser): Promise<IUser> {
      throw new Error("Method not implemented.");
  }
  delete(model: IUser): Promise<boolean> {
      throw new Error("Method not implemented.");
  }
  deleteWhere(params: any): Promise<boolean> {
      throw new Error("Method not implemented.");
  }
  attach(model: IUser, relation: string, payload: string | number | (string | number)[] | Record<string, any>): Promise<void> {
      throw new Error("Method not implemented.");
  }
  sync(model: IUser, relation: string, payload: any[]): Promise<void> {
      throw new Error("Method not implemented.");
  }
  chunk(where: IUser, size: number, cb: (models: IUser[]) => void): Promise<void> {
      throw new Error("Method not implemented.");
  }
  raiseError(): void {
      throw new Error("Method not implemented.");
  }
//   query() {
//       throw new Error("Method not implemented.");
//   }
  updateAndReturn(where: IUser, setValues: any, returnOne?: boolean): Promise<any> {
      throw new Error("Method not implemented.");
  }
  bulkInsert(inputs: any[]): Promise<IUser[]> {
      throw new Error("Method not implemented.");
  }
  @InjectModel(UserModel)
  model: UserModel;
}