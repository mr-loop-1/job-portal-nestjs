import { Transformer } from '@libs/boat';
import { IUser } from 'libs/common/interfaces';
import { UserInfo } from '../dto/userInfo';

export class UserTransformer extends Transformer {
    async transform(user: IUser) : Promise<UserInfo> {
        return {
            name: user.name,
            email: user.email,
            skills: user.skills,
            mobileNo: user.mobileNo,
            role: user.role,
            token: user.token
        }
    }
}
