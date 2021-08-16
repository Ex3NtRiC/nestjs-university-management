import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateLessonArgs } from '../../models/Args/create-lesson.args';
import { Faculties } from '../../models/Args/faculties-enum';
import { LessonType } from 'src/models/Lessons-Model/lesson.type';
import { HRLessonsService } from './HR-lessons.service';
import { UpdateLessonArgs } from '../../models/Args/update-lesson.args';
import { Role } from 'src/auth/role.enum';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { GqlRolesGuard } from 'src/auth/graphql-roles.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles.decorator';

@Roles(Role.HR)
@UseGuards(GqlAuthGuard, GqlRolesGuard)
@Resolver((of) => LessonType)
export class HRLessonsResolver {
  constructor(private readonly HRlessonsService: HRLessonsService) {}

  @Query((returns) => [LessonType])
  HRgetLessons() {
    return this.HRlessonsService.getLessons();
  }

  @Query((returns) => LessonType)
  HRgetLessonById(@Args('id') id: string) {
    return this.HRlessonsService.getLessonById(id);
  }

  @Query((returns) => [LessonType])
  HRgetLessonsByName(@Args('name') name: string) {
    return this.HRlessonsService.getLessonsByName(name);
  }

  @Query((returns) => [LessonType])
  HRgetLessonsByFaculty(@Args('faculty') faculty: Faculties) {
    return this.HRlessonsService.getLessonsByFaculty(faculty);
  }

  @Query((returns) => LessonType)
  HRgetLessonByCode(@Args('code') code: string) {
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
  HRcreateLesson(@Args() createLessonArgs: CreateLessonArgs) {
    return this.HRlessonsService.createLesson(createLessonArgs);
  }

  @Mutation((returns) => LessonType)
  HRupdateLesson(
    @Args('id') id: string,
    @Args() updateLessonArgs: UpdateLessonArgs,
  ) {
    return this.HRlessonsService.updateLesson(id, updateLessonArgs);
  }

  @Mutation((returns) => Boolean)
  HRdeleteLesson(@Args('id') id: string) {
    return this.HRlessonsService.deleteLesson(id);
  }
}
