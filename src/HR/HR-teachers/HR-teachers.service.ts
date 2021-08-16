import { Injectable, NotFoundException } from '@nestjs/common';
import { Lesson } from 'src/models/Lessons-Model/lesson.model';
import { HRLessonsService } from 'src/HR/HR-lessons/HR-lessons.service';
import { Faculties } from '../../models/Args/faculties-enum';
import { CreateTeacherArgs } from '../../models/Args/create-teacher.args';
import { EnrollTeacherArgs } from '../../models/Args/enroll-teacher.args';
import { Teacher } from 'src/models/Teachers-Model/teacher.model';
import { TeacherModelService } from 'src/models/Teachers-Model/teacher-model.service';

@Injectable()
export class HRTeachersService {
  constructor(
    private readonly teacherModelService: TeacherModelService,
    private readonly lessonService: HRLessonsService,
  ) {}
  async getTeachers(): Promise<Teacher[]> {
    const teachers = await this.teacherModelService.getTeachers();
    if (teachers) {
      return teachers;
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

  async getTeacherById(id: string): Promise<Teacher> {
    const teacher = await this.teacherModelService.getTeacherById(id);
    if (teacher) {
      return teacher;
    }
    throw new NotFoundException();
  }

  async getTeachersByName(search: string): Promise<Teacher[]> {
    const teachers = await this.teacherModelService.getTeachersByName(search);
    if (teachers.length > 0) {
      return teachers;
    }
    throw new NotFoundException();
  }

  async getTeachersByFaculty(faculty: Faculties): Promise<Teacher[]> {
    const teachers = await this.teacherModelService.getTeachersByFaculty(
      faculty,
    );
    if (teachers.length > 0) {
      return teachers;
    }
    throw new NotFoundException();
  }

  async getTeachersByEmail(email: string): Promise<Teacher[]> {
    const teachers = await this.teacherModelService.getTeachersByEmail(email);
    if (teachers.length > 0) {
      return teachers;
    }
    throw new NotFoundException();
  }

  async getTeacherByEmail(email: string): Promise<Teacher> {
    const teacher = await this.teacherModelService.getTeacherByEmail(email);
    if (teacher) {
      return teacher;
    }
    throw new NotFoundException();
  }

  async getTeachersByLessonCode(lessonCode: string): Promise<Teacher[]> {
    const lesson = await this.lessonService.getLessonByCode(lessonCode);
    if (lesson) {
      const lessonId = lesson._id;
      const teachers = await this.teacherModelService.getTeachersByLesson(
        lessonId,
      );
      if (teachers.length > 0) {
        return teachers;
      }
      throw new NotFoundException();
    }
    throw new NotFoundException();
  }

  async createTeacher(createTeachersArgs: CreateTeacherArgs): Promise<Teacher> {
    const teacher = await this.teacherModelService.createTeacher(
      createTeachersArgs,
    );
    if (teacher) {
      return teacher;
    }
    throw new NotFoundException();
  }

  async updateTeacher(email, updateTeacherArgs): Promise<Teacher> {
    const teacher = await this.teacherModelService.updateTeacher(
      email,
      updateTeacherArgs,
    );
    if (teacher) {
      return teacher;
    }
    throw new NotFoundException();
  }

  async enrollTeacher(enrollTeacherArgs: EnrollTeacherArgs): Promise<Teacher> {
    const { email, lessonCode } = enrollTeacherArgs;
    const lesson: Lesson = await this.lessonService.getLessonByCode(lessonCode);
    return this.teacherModelService.enrollTeacher(email, lesson);
  }
}
