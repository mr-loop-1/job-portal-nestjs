import { Transformer } from '@libs/boat';
import { IUser } from 'libs/common/interfaces';

export class ApplicationTransformer extends Transformer {
  public availableIncludes = ['recruiter'];
  async transform(user: IUser): Promise<IUser> {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      skills: user.skills,
      mobileNo: user.mobileNo,
      //!!!!! Add User Details here
      // applicationId: user.applicationId,
    };
  }
}
