import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

@ArgsType()
export class CreateStudentArgs {
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
