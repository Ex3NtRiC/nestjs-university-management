import { Injectable } from '@nestjs/common';
import { Lesson } from 'src/models/Lessons-Model/lesson.model';
import { HRLessonsService } from 'src/HR/HR-lessons/HR-lessons.service';
import { CreateStudentArgs } from '../../models/Args/create-student.args';
import { EnrollStudentArgs } from '../../models/Args/entroll-student.args';
import { Student } from 'src/models/Students-Model/student.model';
import { StudentModelService } from 'src/models/Students-Model/student-model.service';

@Injectable()
export class HRStudentsService {
  constructor(
    private readonly lessonService: HRLessonsService,
    private readonly studentModelService: StudentModelService,
  ) {}

  async getStudents(): Promise<Student[]> {
    return this.studentModelService.getStudents();
  }

  async getLessonsById(lessonsIds: string[]) {
    return await this.lessonService.getLessonsById(lessonsIds);
  }

  async getStudentById(id: string): Promise<Student> {
    return this.studentModelService.getStudentById(id);
  }

  async getStudentByStudentId(studentID: number): Promise<Student> {
    return this.studentModelService.getStudentByStudentId(studentID);
  }

  async getStudentByEmail(email: string): Promise<Student> {
    return this.studentModelService.getStudentByEmail(email);
  }

  async getStudentsByName(search: string): Promise<Student[]> {
    return this.studentModelService.getStudentsByName(search);
  }

  async getStudentsByLesson(lessonCode: string): Promise<Student[]> {
    const lesson = await this.lessonService.getLessonByCode(lessonCode);
    const lessonId = lesson._id;
    return this.studentModelService.getStudentsByLesson(lessonId);
  }

  async createStudent(createStudentsArgs: CreateStudentArgs): Promise<Student> {
    return this.studentModelService.createStudent(createStudentsArgs);
  }

  async updateStudent(studentID, updateStudentArgs): Promise<Student> {
    return this.studentModelService.updateStudent(studentID, updateStudentArgs);
  }

  async enrollStudent(enrollStudentArgs: EnrollStudentArgs): Promise<Student> {
    const { studentID, lessonCode } = enrollStudentArgs;
    const lesson: Lesson = await this.lessonService.getLessonByCode(lessonCode);
    return this.studentModelService.enrollStudent(studentID, lesson);
  }

  private async getMaxStudentID() {
    return this.studentModelService.getMaxStudentID();
  }
}
