import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CreateStudentArgs } from '../Args/create-student.args';
import { EnrollStudentArgs } from '../Args/entroll-student.args';
import { Student } from '../../models/student.model';
import { StudentType } from './student.type';
import { StudentsService } from './students.service';
import { UpdateStudentArgs } from '../Args/update-student.args';

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

  @Query((returns) => StudentType)
  getStudentByStudentId(@Args('id') id: number) {
    return this.studentsService.getStudentByStudentId(id);
  }

  @Query((returns) => StudentType)
  getStudentByEmail(@Args('email') email: string) {
    return this.studentsService.getStudentByEmail(email);
  }

  @Query((returns) => [StudentType])
  getStudentByName(@Args('name') name: string) {
    return this.studentsService.getStudentsByName(name);
  }

  @Query((returns) => [StudentType])
  getStudentsByLesson(@Args('lessonCode') code: string) {
    return this.studentsService.getStudentsByLesson(code);
  }

  @Mutation((returns) => StudentType)
  createStudent(@Args() createStudentArgs: CreateStudentArgs) {
    return this.studentsService.createStudent(createStudentArgs);
  }

  @Mutation((returns) => StudentType)
  updateStudent(
    @Args('studentID') studentID: number,
    @Args() updateStudentArgs: UpdateStudentArgs,
  ) {
    return this.studentsService.updateStudent(studentID, updateStudentArgs);
  }

  @Mutation((returns) => StudentType)
  enrollStudent(@Args() enrollStudentArgs: EnrollStudentArgs) {
    return this.studentsService.enrollStudent(enrollStudentArgs);
  }

  @ResolveField()
  async lessons(@Parent() students: Student) {
    return await this.studentsService.getLessonsById(students.lessons);
  }
}
