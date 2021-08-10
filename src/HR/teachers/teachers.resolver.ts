import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CreateTeacherArgs } from './create-teacher.args';
import { EnrollTeacherArgs } from './enroll-teacher.args';
import { Teacher } from './teacher.model';
import { TeacherType } from './teacher.type';
import { TeachersService } from './teachers.service';

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

  @Mutation((returns) => TeacherType)
  createTeacher(@Args() createStudentArgs: CreateTeacherArgs) {
    return this.teachersService.createTeacher(createStudentArgs);
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
