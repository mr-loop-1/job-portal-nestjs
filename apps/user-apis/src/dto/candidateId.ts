import { Exists, IsNotEmpty, IsString } from '@libs/boat/validator';
import { ROLE, STATUS } from 'libs/common/constants';

export class CandidateIdDto {
  @Exists({
    table: 'users',
    column: 'ulid',
    where: { status: STATUS.active, role: ROLE.candidate },
  })
  @IsString()
  @IsNotEmpty()
  id: string;
}
