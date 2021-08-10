import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

@ArgsType()
export class CreateHRArgs {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  @Field()
  firstName: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  @Field()
  lastName: string;
}
