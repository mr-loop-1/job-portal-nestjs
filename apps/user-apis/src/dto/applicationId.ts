import { Exists, IsNotEmpty, IsString } from '@libs/boat/validator';
import { Status } from 'libs/common/enums';

export class ApplicationIdDto {
  @Exists({
    table: 'applications',
    column: 'ulid',
    where: { status: Status.Active },
  })
  @IsString()
  @IsNotEmpty()
  id: string;
}
