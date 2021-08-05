import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lesson } from 'src/lessons/lesson.model';
import { LessonsService } from 'src/lessons/lessons.service';
import { CreateStudentArgs } from './create-student.args';
import { EnrollStudentArgs } from './entroll-student.args';
import { Student } from './student.model';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel('Student') private readonly studentModel: Model<Student>,
    private readonly lessonService: LessonsService,
  ) {}

  async getStudents(): Promise<Student[]> {
    const users = await this.studentModel.find().populate('lessons').exec();
    return users;
  }

  async getStudentById(id: string): Promise<Student> {
    return await (
      await this.studentModel.findById(id).populate('lessons')
    ).execPopulate();
  }

  async createStudent(createStudentsArgs: CreateStudentArgs): Promise<Student> {
    const { firstName, lastName } = createStudentsArgs;
    const student = new this.studentModel({ firstName, lastName });
    return await student.save();
  }

  async enrollStudent(enrollStudentArgs: EnrollStudentArgs): Promise<Student> {
    const { studentId, lessonId } = enrollStudentArgs;
    const student: Student = await (
      await this.studentModel.findById(studentId).populate('lessons')
    ).execPopulate();
    const lesson: Lesson = await this.lessonService.getLessonById(lessonId);
    student.lessons.push(lesson);
    const s = await student.save();
    return s;
  }
}
