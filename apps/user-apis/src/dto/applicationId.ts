import { Exists, IsNotEmpty, IsString } from '@libs/boat/validator';
import { STATUS } from 'libs/common/constants';

export class ApplicationIdDto {
  @Exists({
    table: 'applications',
    column: 'ulid',
    where: { status: STATUS.active },
  })
  @IsString()
  @IsNotEmpty()
  id: string;
}
