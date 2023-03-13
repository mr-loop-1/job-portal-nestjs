import { BaseModel } from "@libs/database";

export class AdminModel extends BaseModel {
  static tableName = "users";

  static get jsonSchema() {
    return {
        type: 'object',
        properties: {
            email: {type: 'string'},
            password: {type: 'string'}
        }
    }
  }
//   static get jsonSchema() {

//   }
  
}