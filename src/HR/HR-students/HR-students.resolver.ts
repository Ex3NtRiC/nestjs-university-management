import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CreateStudentArgs } from '../../models/Args/create-student.args';
import { EnrollStudentArgs } from '../../models/Args/entroll-student.args';
import { Student } from 'src/models/Students-Model/student.model';
import { StudentType } from 'src/models/Students-Model/student.type';
import { HRStudentsService } from './HR-students.service';
import { UpdateStudentArgs } from '../../models/Args/update-student.args';
import { Role } from 'src/auth/role.enum';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { GqlRolesGuard } from 'src/auth/graphql-roles.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles.decorator';

@Roles(Role.HR)
@UseGuards(GqlAuthGuard, GqlRolesGuard)
@Resolver((of) => StudentType)
export class HRStudentsResolver {
  constructor(private readonly studentsService: HRStudentsService) {}

  @Query((returns) => [StudentType])
  HRgetStudents() {
    return this.studentsService.getStudents();
  }

  @Query((returns) => StudentType)
  HRgetStudentById(@Args('id') id: string) {
    return this.studentsService.getStudentById(id);
  }

  @Query((returns) => StudentType)
  HRgetStudentByStudentId(@Args('id') id: number) {
    return this.studentsService.getStudentByStudentId(id);
  }

  @Query((returns) => StudentType)
  getStudentByEmail(@Args('email') email: string) {
    return this.studentsService.getStudentByEmail(email);
  }

  @Query((returns) => [StudentType])
  HRgetStudentByName(@Args('name') name: string) {
    return this.studentsService.getStudentsByName(name);
  }

  @Query((returns) => [StudentType])
  HRgetStudentsByLesson(@Args('lessonCode') code: string) {
    return this.studentsService.getStudentsByLesson(code);
  }

  @Mutation((returns) => StudentType)
  HRcreateStudent(@Args() createStudentArgs: CreateStudentArgs) {
    return this.studentsService.createStudent(createStudentArgs);
  }

  @Mutation((returns) => StudentType)
  HRupdateStudent(
    @Args('studentID') studentID: number,
    @Args() updateStudentArgs: UpdateStudentArgs,
  ) {
    return this.studentsService.updateStudent(studentID, updateStudentArgs);
  }

  @Mutation((returns) => StudentType)
  HRenrollStudent(@Args() enrollStudentArgs: EnrollStudentArgs) {
    return this.studentsService.enrollStudent(enrollStudentArgs);
  }

  @ResolveField()
  lessons(@Parent() students: Student) {
    return this.studentsService.getLessonsById(students.lessons);
  }
}
