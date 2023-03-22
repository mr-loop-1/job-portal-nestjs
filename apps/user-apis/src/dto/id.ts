import { IsNotEmpty, IsString } from '@libs/boat/validator';

export class IdDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
