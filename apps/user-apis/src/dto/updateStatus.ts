import {
  Exists,
  IsEmail,
  IsEqualToProp,
  IsNotEmpty,
  IsString,
  Length,
  IsNumber,
  Min,
} from '@libs/boat/validator';

export class UpdateJobDto {
  //   @IsValueFromConfig()
  @IsNumber()
  @IsNotEmpty()
  status: number;
}
