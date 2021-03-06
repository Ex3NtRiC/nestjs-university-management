import { Field, ID, ObjectType } from '@nestjs/graphql';
import { LessonType } from '../Lessons-Model/lesson.type';
import { Faculties } from '../Args/faculties-enum';

@ObjectType('Teacher')
export class TeacherType {
  @Field((type) => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  faculty: Faculties;

  @Field((type) => [LessonType])
  lessons: LessonType[];

  @Field((type) => [String])
  roles: string[];
}
