import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Faculties } from '../../models/Args/faculties-enum';
import { CreateTeacherArgs } from '../../models/Args/create-teacher.args';
import { EnrollTeacherArgs } from '../../models/Args/enroll-teacher.args';
import { Teacher } from 'src/models/Teachers-Model/teacher.model';
import { TeacherType } from 'src/models/Teachers-Model/teacher.type';
import { HRTeachersService } from './HR-teachers.service';
import { HRUpdateTeacherArgs } from '../../models/Args/HR-update-teacher.args';
import { Role } from 'src/auth/role.enum';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { GqlRolesGuard } from 'src/auth/graphql-roles.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles.decorator';

@Roles(Role.HR)
@UseGuards(GqlAuthGuard, GqlRolesGuard)
@Resolver((of) => TeacherType)
export class HRTeachersResolver {
  constructor(private readonly teachersService: HRTeachersService) {}

  @Query((returns) => [TeacherType])
  HRgetTeachers() {
    return this.teachersService.getTeachers();
  }

  @Query((returns) => TeacherType)
  HRgetTeacherById(@Args('id') id: string) {
    return this.teachersService.getTeacherById(id);
  }

  @Query((returns) => [TeacherType])
  HRgetTeachersByFaculty(@Args('faculty') faculty: Faculties) {
    return this.teachersService.getTeachersByFaculty(faculty);
  }

  @Query((returns) => [TeacherType])
  HRgetTeacherByEmail(@Args('email') email: string) {
    return this.teachersService.getTeachersByEmail(email);
  }

  @Query((returns) => [TeacherType])
  getTeachersByLessonCode(@Args('lessonCode') code: string) {
    return this.teachersService.getTeachersByLessonCode(code);
  }

  @Mutation((returns) => TeacherType)
  HRcreateTeacher(@Args() createStudentArgs: CreateTeacherArgs) {
    return this.teachersService.createTeacher(createStudentArgs);
  }

  @Mutation((returns) => TeacherType)
  HRupdateTeacher(
    @Args('email') email: string,
    @Args() updateTeacherArgs: HRUpdateTeacherArgs,
  ) {
    return this.teachersService.updateTeacher(email, updateTeacherArgs);
  }

  @Mutation((returns) => TeacherType)
  HRenrollTeacher(@Args() enrollStudentArgs: EnrollTeacherArgs) {
    return this.teachersService.enrollTeacher(enrollStudentArgs);
  }

  @ResolveField()
  lessons(@Parent() teachers: Teacher) {
    return this.teachersService.getLessonsById(teachers.lessons);
  }
}
