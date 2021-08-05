import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateStudentArgs } from './create-student.args';
import { EnrollStudentArgs } from './entroll-student.args';
import { StudentType } from './student.type';
import { StudentsService } from './students.service';

@Resolver((of) => StudentType)
export class StudentResolver {
  constructor(private readonly studentsService: StudentsService) {}

  @Query((returns) => [StudentType])
  getStudents() {
    return this.studentsService.getStudents();
  }

  @Query((returns) => StudentType)
  getStudentById(@Args('id') id: string) {
    return this.studentsService.getStudentById(id);
  }

  @Mutation((returns) => StudentType)
  createStudent(@Args() createStudentArgs: CreateStudentArgs) {
    return this.studentsService.createStudent(createStudentArgs);
  }

  @Mutation((returns) => StudentType)
  enrollStudent(@Args() enrollStudentArgs: EnrollStudentArgs) {
    return this.studentsService.enrollStudent(enrollStudentArgs);
  }
}
