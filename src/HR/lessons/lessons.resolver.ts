import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateLessonArgs } from './create-lesson.args';
import { Faculties } from './faculties-enum';
import { LessonType } from './lesson.type';
import { LessonsService } from './lessons.service';
import { UpdateLessonArgs } from './update-lesson.args';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(private readonly lessonsService: LessonsService) {}

  @Query((returns) => [LessonType])
  getLessons() {
    return this.lessonsService.getLessons();
  }

  @Query((returns) => LessonType)
  getLessonById(@Args('id') id: string) {
    return this.lessonsService.getLessonById(id);
  }

  @Query((returns) => [LessonType])
  getLessonsByName(@Args('name') name: string) {
    return this.lessonsService.getLessonsByName(name);
  }

  @Query((returns) => [LessonType])
  getLessonsByFaculty(@Args('faculty') faculty: Faculties) {
    return this.lessonsService.getLessonsByFaculty(faculty);
  }

  @Query((returns) => LessonType)
  getLessonByCode(@Args('code') code: string) {
    return this.lessonsService.getLessonByCode(code);
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

  @Mutation((returns) => LessonType)
  updateLesson(
    @Args('id') id: string,
    @Args() updateLessonArgs: UpdateLessonArgs,
  ) {
    return this.lessonsService.updateLesson(id, updateLessonArgs);
  }

  @Mutation((returns) => Boolean)
  deleteLesson(@Args('id') id: string) {
    return this.lessonsService.deleteLesson(id);
  }
}
