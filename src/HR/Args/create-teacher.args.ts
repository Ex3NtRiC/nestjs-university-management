import { ArgsType, Field } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Faculties } from './faculties-enum';

@ArgsType()
export class CreateTeacherArgs {
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

  @IsNotEmpty()
  @IsEnum(Faculties)
  @Field()
  faculty: Faculties;
}
