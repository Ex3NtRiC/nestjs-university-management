import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, MaxLength, MinLength } from 'class-validator';

@ArgsType()
export class HRUpdateStudentArgs {
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
}
