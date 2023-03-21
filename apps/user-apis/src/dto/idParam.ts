import { IsNotEmpty, IsString } from '@libs/boat/validator';

export class IdParamDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
