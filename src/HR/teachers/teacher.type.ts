import { Field, ID, ObjectType } from '@nestjs/graphql';
import { LessonType } from 'src/HR/lessons/lesson.type';
import { Faculties } from '../lessons/faculties-enum';

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
}
