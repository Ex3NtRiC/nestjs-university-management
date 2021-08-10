import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class EnrollTeacherArgs {
  @Field()
  teacherId: string;

  @Field()
  lessonId: string;
}
