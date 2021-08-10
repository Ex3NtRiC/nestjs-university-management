import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateLessonArgs } from './create-lession.args';
import { LessonType } from './lesson.type';
import { LessonsService } from './lessons.service';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(private readonly lessonsService: LessonsService) {}

  @Query((returns) => LessonType)
  getLessonById(@Args('id') id: string) {
    return this.lessonsService.getLessonById(id);
  }
  // ==> This is an alternative <== //
  //   @Mutation((returns) => LessonType)
  //   createLesson(
  //     @Args('createLessonInput') createLessonInput: CreateLessonInput,
  //   ) {
  //     return this.lessonsService.createLesson(createLessonInput);
  //   }

  @Mutation((returns) => LessonType)
  createLesson(@Args() createLessonArgs: CreateLessonArgs) {
    return this.lessonsService.createLesson(createLessonArgs);
  }

  @Query((returns) => [LessonType])
  getLessons() {
    return this.lessonsService.getLessons();
  }
}
