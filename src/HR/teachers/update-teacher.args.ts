import { ArgsType, Field } from '@nestjs/graphql';
import { IsEnum, IsOptional, MaxLength, MinLength } from 'class-validator';
import { Faculties } from '../lessons/faculties-enum';

@ArgsType()
export class UpdateTeacherArgs {
  @IsOptional()
  @MinLength(3)
  @MaxLength(30)
  @Field({ nullable: true })
  firstName?: string;

  @IsOptional()
  @MinLength(3)
  @MaxLength(30)
  @Field({ nullable: true })
  lastName?: string;

  @IsOptional()
  @IsEnum(Faculties)
  @Field({ nullable: true })
  faculty?: Faculties;
}
