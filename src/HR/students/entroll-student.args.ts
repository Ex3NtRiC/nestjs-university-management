import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class EnrollStudentArgs {
  @Field()
  studentId: string;

  @Field()
  lessonId: string;
}
