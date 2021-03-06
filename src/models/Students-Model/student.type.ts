import { Field, ID, ObjectType } from '@nestjs/graphql';
import { LessonType } from '../Lessons-Model/lesson.type';

@ObjectType('Student')
export class StudentType {
  @Field((type) => ID)
  id: string;

  @Field()
  studentID: number;

  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field((type) => [LessonType])
  lessons: LessonType[];

  @Field((type) => [String])
  roles: string[];
}
