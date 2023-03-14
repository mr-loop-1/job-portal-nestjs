import { Transformer } from '@libs/boat';
import { IUser } from 'libs/common/interfaces';

export class UserTransformer extends Transformer {
    async transform(user: IUser) : Promise<any> {
        return {
            name: user.name,
            email: user.email,
            skills: user.skills,
            mobileNo: user.mobileNo,
            token: user.token
        }
    }
}
