import { Exists, IsNotEmpty, IsString } from '@libs/boat/validator';
import { Status } from 'libs/common/enums';

export class CandidateIdDto {
  @Exists({
    table: 'users',
    column: 'ulid',
    where: { status: Status.Active },
  })
  @IsString()
  @IsNotEmpty()
  id: string;
}
