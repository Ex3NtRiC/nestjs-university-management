import { Injectable, NotFoundException } from '@nestjs/common';
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
    const students = await this.studentModelService.getStudents();
    if (students.length > 0) {
      return students;
    }
    throw new NotFoundException();
  }

  async getLessonsById(lessonsIds: string[]) {
    const lessons = await this.lessonService.getLessonsById(lessonsIds);
    if (lessons.length > 0) {
      return lessons;
    }
    throw new NotFoundException();
  }

  async getStudentById(id: string): Promise<Student> {
    const student = await this.studentModelService.getStudentById(id);
    if (student) {
      return student;
    }
    throw new NotFoundException();
  }

  async getStudentByStudentId(studentID: number): Promise<Student> {
    const student = await this.studentModelService.getStudentByStudentId(
      studentID,
    );
    if (student) {
      return student;
    }
    throw new NotFoundException();
  }

  async getStudentByEmail(email: string): Promise<Student> {
    const student = await this.studentModelService.getStudentByEmail(email);
    if (student) {
      return student;
    }
    throw new NotFoundException();
  }

  async getStudentsByName(search: string): Promise<Student[]> {
    const student = await this.studentModelService.getStudentsByName(search);
    if (student) {
      return student;
    }
    throw new NotFoundException();
  }

  async getStudentsByLesson(lessonCode: string): Promise<Student[]> {
    const lesson = await this.lessonService.getLessonByCode(lessonCode);
    if (lesson) {
      const lessonId = lesson._id;
      const students = await this.studentModelService.getStudentsByLesson(
        lessonId,
      );
      if (students.length > 0) {
        return students;
      }
      throw new NotFoundException();
    }
    throw new NotFoundException();
  }

  async createStudent(createStudentsArgs: CreateStudentArgs): Promise<Student> {
    const student = await this.studentModelService.createStudent(
      createStudentsArgs,
    );
    if (student) {
      return student;
    }
    throw new NotFoundException();
  }

  async updateStudent(studentID, updateStudentArgs): Promise<Student> {
    const student = await this.studentModelService.updateStudent(
      studentID,
      updateStudentArgs,
    );
    if (student) {
      return student;
    }
    throw new NotFoundException();
  }

  async enrollStudent(enrollStudentArgs: EnrollStudentArgs): Promise<Student> {
    const { studentID, lessonCode } = enrollStudentArgs;
    const lesson: Lesson = await this.lessonService.getLessonByCode(lessonCode);
    return this.studentModelService.enrollStudent(studentID, lesson);
  }
}
