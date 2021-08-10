import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class EnrollTeacherArgs {
  @Field()
  email: string;

  @Field()
  lessonCode: string;
}
