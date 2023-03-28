import { Transform } from 'class-transformer';
import { Exists, IsNotEmpty, IsNumber, IsString } from '@libs/boat/validator';
import { STATUS } from 'libs/common/constants';

export class DeleteUserDto {
  @Exists({
    table: 'users',
    column: 'ulid',
    where: { status: STATUS.active },
  })
  @IsString()
  @IsNotEmpty()
  id: string;
}
