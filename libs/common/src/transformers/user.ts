import { Transformer } from '@libs/boat';
import { IUser } from 'libs/common/interfaces';

export class UserTransformer extends Transformer {
  async transform(user: IUser): Promise<IUser> {
    return {
      userId: user.ulid,
      name: user.name,
      email: user.email,
      skills: user.skills,
      mobileNo: user.mobileNo,
      role: user.role,
      token: user.token,
    };
  }
}
