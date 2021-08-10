import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateLessonInput {
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;

  @IsNotEmpty()
  @Field()
  code: string;

  @IsNotEmpty()
  @Field()
  department: string;

  @IsNotEmpty()
  @Field()
  credits: number;
}

//Args is a better way in graphql than Input
