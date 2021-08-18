import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { TRUpdateTeacherArgs } from 'src/models/Args/TR-update-teacher.args';
import { LessonType } from 'src/models/Lessons-Model/lesson.type';
import { Teacher } from 'src/models/Teachers-Model/teacher.model';
import { TeacherType } from 'src/models/Teachers-Model/teacher.type';
import { TeachersService } from './teachers.service';
import { GqlRolesGuard } from 'src/auth/graphql-roles.guard';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { StudentType } from 'src/models/Students-Model/student.type';

@Roles(Role.Teacher)
@UseGuards(GqlAuthGuard, GqlRolesGuard)
@Resolver((of) => TeacherType)
export class TeachersResolver {
  constructor(private readonly teachersService: TeachersService) {}

  @Query((returns) => TeacherType)
  TRgetTeacherByEmail(@CurrentUser() user: Teacher) {
    return this.teachersService.getTeacherByEmail(user.email);
  }

  @Query((returns) => [StudentType])
  TRgetTeacherStudents(@CurrentUser() user: Teacher) {
    return this.teachersService.getTeacherStudents(user.lessons);
  }

  @Query((returns) => [LessonType])
  TRgetTeacherLessons(@CurrentUser() user: Teacher) {
    return this.teachersService.getTeacherLessons(user.lessons);
  }

  @Query((returns) => [LessonType])
  TRgetLessons() {
    return this.teachersService.getLessons();
  }

  @Query((returns) => [StudentType])
  TRgetLessonStudents(
    @Args('lessonCode') lessonCode: string,
    @CurrentUser() user: Teacher,
  ) {
    return this.teachersService.getLessonStudents(user.email, lessonCode);
  }

  @Mutation((returns) => TeacherType)
  TRupdateTeacher(
    @CurrentUser() user: Teacher,
    @Args() updateStudentArgs: TRUpdateTeacherArgs,
  ) {
    return this.teachersService.updateTeacher(user.email, updateStudentArgs);
  }
  @ResolveField()
  lessons(@Parent() teachers: Teacher) {
    return this.teachersService.getLessonsById(teachers.lessons);
  }
}
