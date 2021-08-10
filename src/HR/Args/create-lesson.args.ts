import { ArgsType, Field } from '@nestjs/graphql';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Faculties } from './faculties-enum';

@ArgsType()
export class CreateLessonArgs {
  @MinLength(3)
  @MaxLength(30)
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;

  @MinLength(3)
  @MaxLength(30)
  @IsNotEmpty()
  @IsEnum(Faculties)
  @Field()
  faculty: Faculties;

  @IsNotEmpty()
  @Field()
  credits: number;

  @IsNotEmpty()
  @Field()
  code: string;
}
