import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Faculties } from './faculties-enum';

@ObjectType('Lesson')
export class LessonType {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  code: string;

  @Field()
  faculty: Faculties;

  @Field()
  credits: number;
}
