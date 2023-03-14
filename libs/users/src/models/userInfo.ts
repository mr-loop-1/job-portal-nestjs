import { BaseModel } from "@libs/database";

export class UserInfoModel {
  static tableName = "users";
  name: string;
  email: string;
  skills: string;
  mobileNo: string;
  access_token: string;
}