import {
  IsNotEmpty,
  IsNumber,
  IsValueFromConfig,
  IsString,
  Exists,
} from '@libs/boat/validator';
import { ERROR } from 'libs/common/constants';
import { STATUS } from 'libs/common/constants';

export class UpdateStatusDto {
  @IsValueFromConfig(
    { key: 'settings.applications.status' },
    { message: ERROR.INVALID_STATUS_UPDATE },
  )
  @IsNumber()
  @IsNotEmpty()
  status: number;

  @Exists({
    table: 'applications',
    column: 'ulid',
    where: { status: STATUS.active },
  })
  @IsString()
  @IsNotEmpty()
  id: string;
}
