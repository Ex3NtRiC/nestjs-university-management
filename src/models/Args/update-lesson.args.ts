import { ArgsType, Field } from '@nestjs/graphql';
import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Faculties } from './faculties-enum';

@ArgsType()
export class UpdateLessonArgs {
  @MinLength(3)
  @MaxLength(30)
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  name?: string;

  @MinLength(3)
  @MaxLength(30)
  @IsOptional()
  @IsEnum(Faculties)
  @Field({ nullable: true })
  faculty?: Faculties;

  @IsOptional()
  @Field({ nullable: true })
  credits?: number;

  @IsOptional()
  @Field({ nullable: true })
  code?: string;
}
