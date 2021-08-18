import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GqlRolesGuard } from 'src/auth/graphql-roles.guard';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { STUpdateStudentArgs } from 'src/models/Args/ST-update-student.args';
import { LessonType } from 'src/models/Lessons-Model/lesson.type';
import { Student } from 'src/models/Students-Model/student.model';
import { StudentType } from 'src/models/Students-Model/student.type';
import { TeacherType } from 'src/models/Teachers-Model/teacher.type';
import { StudentsService } from './students.service';

@Roles(Role.Student)
@UseGuards(GqlAuthGuard, GqlRolesGuard)
@Resolver((of) => StudentType)
export class StudentsResolver {
  constructor(private readonly studentsService: StudentsService) {}

  @Query((returns) => StudentType)
  STgetStudentByEmail(@CurrentUser() user: Student) {
    return this.studentsService.getStudentByEmail(user.email);
  }

  @Query((returns) => [TeacherType])
  STgetStudentTeachers(@CurrentUser() user: Student) {
    return this.studentsService.getStudentTeachers(user.lessons);
  }

  @Query((returns) => [LessonType])
  STgetStudentTLessons(@CurrentUser() user: Student) {
    return this.studentsService.getStudentLessons(user.lessons);
  }

  @Query((returns) => [LessonType])
  STgetLessons() {
    return this.studentsService.getLessons();
  }

  @Mutation((returns) => StudentType)
  STupdateStudent(
    @CurrentUser() user: Student,
    @Args() updateStudentArgs: STUpdateStudentArgs,
  ) {
    const studentID: number = parseInt(user.email.split('@')[0]);
    return this.studentsService.updateStudent(studentID, updateStudentArgs);
  }
  @ResolveField()
  lessons(@Parent() students: Student) {
    return this.studentsService.getLessonsById(students.lessons);
  }
}
