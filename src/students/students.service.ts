import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateStudentArgs } from 'src/models/Args/update-student.args';
import { LessonModelService } from 'src/models/Lessons-Model/lesson-model.service';
import { Lesson } from 'src/models/Lessons-Model/lesson.model';
import { StudentModelService } from 'src/models/Students-Model/student-model.service';
import { Student } from 'src/models/Students-Model/student.model';
import { TeacherModelService } from 'src/models/Teachers-Model/teacher-model.service';
import { Teacher } from 'src/models/Teachers-Model/teacher.model';

@Injectable()
export class StudentsService {
  constructor(
    private readonly studentModelService: StudentModelService,
    private readonly lessonModelService: LessonModelService,
    private readonly teacherModelService: TeacherModelService,
  ) {}

  async getStudentByEmail(email: string): Promise<Student> {
    return await this.studentModelService.getStudentByEmail(email);
  }

  async getLessonsById(lessonsIds: string[]): Promise<Lesson[]> {
    const lessons = await this.lessonModelService.getLessonsById(lessonsIds);
    if (lessons.length > 0) {
      return lessons;
    }
    throw new NotFoundException();
  }

  async getStudentTeachers(lessonsIds: string[]): Promise<Teacher[]> {
    const teachers: Teacher[] = [];
    for (let i = 0; i < lessonsIds.length; i++) {
      const teacher: Teacher =
        await this.teacherModelService.getTeacherByLesson(lessonsIds[i]);
      if (teacher) {
        teachers.push(teacher);
      }
    }
    if (teachers.length > 0) {
      return teachers;
    }
    throw new NotFoundException();
  }

  async getStudentLessons(lessonsIds: string[]): Promise<Lesson[]> {
    const lessons: Lesson[] = [];
    for (let i = 0; i < lessonsIds.length; i++) {
      const lesson: Lesson = await this.lessonModelService.getLessonById(
        lessonsIds[i],
      );
      if (lesson) {
        lessons.push(lesson);
      }
    }
    if (lessons.length > 0) {
      return lessons;
    }
    throw new NotFoundException();
  }

  async getLessons() {
    const lessons = await this.lessonModelService.getLessons();
    if (lessons.length > 0) {
      return lessons;
    }
    throw new NotFoundException();
  }

  async updateStudent(
    studentID: number,
    updateStudentArgs: UpdateStudentArgs,
  ): Promise<Student> {
    const student = await this.studentModelService.updateStudent(
      studentID,
      updateStudentArgs,
    );
    if (student) {
      return student;
    }
    throw new NotFoundException();
  }
}
