import {
  IsNotEmpty,
  IsNumber,
  IsValueFromConfig,
  IsString,
  Exists,
} from '@libs/boat/validator';
import { ERROR } from 'libs/common/constants';
import { Status } from 'libs/common/enums';

export class UpdateStatusDto {
  @IsValueFromConfig(
    { key: 'settings.status' },
    { message: ERROR.INVALID_STATUS_UPDATE },
  )
  @IsNumber()
  @IsNotEmpty()
  status: number;

  @Exists({
    table: 'applications',
    column: 'ulid',
    where: { status: Status.Active },
  })
  @IsString()
  @IsNotEmpty()
  id: string;
}
