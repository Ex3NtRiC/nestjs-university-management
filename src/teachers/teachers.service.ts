import { Injectable, NotFoundException } from '@nestjs/common';
import { TRUpdateTeacherArgs } from 'src/models/Args/TR-update-teacher.args';
import { LessonModelService } from 'src/models/Lessons-Model/lesson-model.service';
import { Lesson } from 'src/models/Lessons-Model/lesson.model';
import { StudentModelService } from 'src/models/Students-Model/student-model.service';
import { Student } from 'src/models/Students-Model/student.model';
import { TeacherModelService } from 'src/models/Teachers-Model/teacher-model.service';
import { Teacher } from 'src/models/Teachers-Model/teacher.model';
@Injectable()
export class TeachersService {
  constructor(
    private readonly studentModelService: StudentModelService,
    private readonly lessonModelService: LessonModelService,
    private readonly teacherModelService: TeacherModelService,
  ) {}

  async getTeacherByEmail(email: string): Promise<Teacher> {
    return await this.teacherModelService.getTeacherByEmail(email);
  }

  async getLessonsById(lessonsIds: string[]): Promise<Lesson[]> {
    const lessons = await this.lessonModelService.getLessonsById(lessonsIds);
    if (lessons.length > 0) {
      return lessons;
    }
    throw new NotFoundException();
  }

  async getTeacherStudents(lessonsIds: string[]): Promise<Student[]> {
    const students: Student[] = [];
    for (let i = 0; i < lessonsIds.length; i++) {
      const studentsPerClass: Student[] =
        await this.studentModelService.getStudentsByLesson(lessonsIds[i]);
      if (studentsPerClass) {
        students.push(...studentsPerClass);
      }
    }
    if (students.length > 0) {
      return students;
    }
    throw new NotFoundException();
  }

  async getTeacherLessons(lessonsIds: string[]): Promise<Lesson[]> {
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

  async getLessonStudents(email: string, lessonCode: string) {
    const lesson = await this.lessonModelService.getLessonByCode(lessonCode);
    if (!lesson) {
      throw new NotFoundException('No such lesson');
    }
    const found: boolean = await this.teacherModelService.hasLesson(
      email,
      lesson._id,
    );
    if (!found) {
      throw new NotFoundException('You do not teach this lesson');
    }
    const students: Student[] =
      await this.studentModelService.getStudentsByLesson(lesson._id);
    if (students.length > 0) {
      return students;
    }
    throw new NotFoundException('No students registed in this lesson');
  }

  async updateTeacher(
    email: string,
    updateTeacherArgs: TRUpdateTeacherArgs,
  ): Promise<Teacher> {
    const teacher = await this.teacherModelService.updateTeacher(
      email,
      updateTeacherArgs,
    );
    if (teacher) {
      return teacher;
    }
    throw new NotFoundException();
  }
}
