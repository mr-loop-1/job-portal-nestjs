import { Transform } from 'class-transformer';
import { Exists, IsNotEmpty, IsNumber, IsString } from '@libs/boat/validator';
import { Status } from 'libs/common/enums';

export class DeleteUserDto {
  @Exists({
    table: 'users',
    column: 'ulid',
    where: { status: Status.Active },
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  role: number;
}
