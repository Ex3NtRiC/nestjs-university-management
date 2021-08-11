import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Faculties } from '../Args/faculties-enum';
import { CreateTeacherArgs } from '../Args/create-teacher.args';
import { EnrollTeacherArgs } from '../Args/enroll-teacher.args';
import { Teacher } from '../../models/teacher.model';
import { TeacherType } from './teacher.type';
import { TeachersService } from './teachers.service';
import { UpdateTeacherArgs } from '../Args/update-teacher.args';

@Resolver((of) => TeacherType)
export class TeachersResolver {
  constructor(private readonly teachersService: TeachersService) {}

  @Query((returns) => [TeacherType])
  getTeachers() {
    return this.teachersService.getTeachers();
  }

  @Query((returns) => TeacherType)
  getTeacherById(@Args('id') id: string) {
    return this.teachersService.getTeacherById(id);
  }

  @Query((returns) => [TeacherType])
  getTeachersByFaculty(@Args('faculty') faculty: Faculties) {
    return this.teachersService.getTeachersByFaculty(faculty);
  }

  @Query((returns) => [TeacherType])
  getTeacherByEmail(@Args('email') email: string) {
    return this.teachersService.getTeachersByEmail(email);
  }

  @Query((returns) => [TeacherType])
  getTeachersByLesson(@Args('lessonCode') code: string) {
    return this.teachersService.getTeachersByLesson(code);
  }

  @Mutation((returns) => TeacherType)
  createTeacher(@Args() createStudentArgs: CreateTeacherArgs) {
    return this.teachersService.createTeacher(createStudentArgs);
  }

  @Mutation((returns) => TeacherType)
  updateTeacher(
    @Args('email') email: string,
    @Args() updateTeacherArgs: UpdateTeacherArgs,
  ) {
    return this.teachersService.updateTeacher(email, updateTeacherArgs);
  }

  @Mutation((returns) => TeacherType)
  enrollTeacher(@Args() enrollStudentArgs: EnrollTeacherArgs) {
    return this.teachersService.enrollTeacher(enrollStudentArgs);
  }

  @ResolveField()
  async lessons(@Parent() teachers: Teacher) {
    return await this.teachersService.getLessonsById(teachers.lessons);
  }
}
