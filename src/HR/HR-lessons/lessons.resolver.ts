import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateLessonArgs } from '../../models/Args/create-lesson.args';
import { Faculties } from '../../models/Args/faculties-enum';
import { LessonType } from 'src/models/Lessons-Model/lesson.type';
import { HRLessonsService } from './HR-lessons.service';
import { UpdateLessonArgs } from '../../models/Args/update-lesson.args';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(private readonly HRlessonsService: HRLessonsService) {}

  @Query((returns) => [LessonType])
  getLessons() {
    return this.HRlessonsService.getLessons();
  }

  @Query((returns) => LessonType)
  getLessonById(@Args('id') id: string) {
    return this.HRlessonsService.getLessonById(id);
  }

  @Query((returns) => [LessonType])
  getLessonsByName(@Args('name') name: string) {
    return this.HRlessonsService.getLessonsByName(name);
  }

  @Query((returns) => [LessonType])
  getLessonsByFaculty(@Args('faculty') faculty: Faculties) {
    return this.HRlessonsService.getLessonsByFaculty(faculty);
  }

  @Query((returns) => LessonType)
  getLessonByCode(@Args('code') code: string) {
    return this.HRlessonsService.getLessonByCode(code);
  }

  // ==> This is an alternative <== //
  //   @Mutation((returns) => LessonType)
  //   createLesson(
  //     @Args('createLessonInput') createLessonInput: CreateLessonInput,
  //   ) {
  //     return this.HRlessonsService.createLesson(createLessonInput);
  //   }

  @Mutation((returns) => LessonType)
  createLesson(@Args() createLessonArgs: CreateLessonArgs) {
    return this.HRlessonsService.createLesson(createLessonArgs);
  }

  @Mutation((returns) => LessonType)
  updateLesson(
    @Args('id') id: string,
    @Args() updateLessonArgs: UpdateLessonArgs,
  ) {
    return this.HRlessonsService.updateLesson(id, updateLessonArgs);
  }

  @Mutation((returns) => Boolean)
  deleteLesson(@Args('id') id: string) {
    return this.HRlessonsService.deleteLesson(id);
  }
}
