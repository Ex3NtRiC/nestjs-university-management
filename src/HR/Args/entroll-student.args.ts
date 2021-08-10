import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class EnrollStudentArgs {
  @Field()
  studentID: number;

  @Field()
  lessonCode: string;
}
