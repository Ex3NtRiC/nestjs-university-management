import { Injectable } from '@nestjs/common';
import { Lesson } from '../../models/lesson.model';
import { LessonsService } from 'src/HR/lessons/lessons.service';
import { Faculties } from '../../models/Args/faculties-enum';
import { CreateTeacherArgs } from '../../models/Args/create-teacher.args';
import { EnrollTeacherArgs } from '../../models/Args/enroll-teacher.args';
import { Teacher } from '../../models/teacher.model';
import { TeacherModelService } from 'src/models/teacher-model.service';

@Injectable()
export class TeachersService {
  constructor(
    private readonly teacherModelService: TeacherModelService,
    private readonly lessonService: LessonsService,
  ) {}
  async getTeachers(): Promise<Teacher[]> {
    return this.teacherModelService.getTeachers();
  }

  async getLessonsById(lessonsIds: string[]) {
    return await this.lessonService.getLessonsById(lessonsIds);
  }

  async getTeacherById(id: string): Promise<Teacher> {
    return this.teacherModelService.getTeacherById(id);
  }

  async getTeachersByName(search: string): Promise<Teacher[]> {
    return this.teacherModelService.getTeachersByName(search);
  }

  async getTeachersByFaculty(faculty: Faculties): Promise<Teacher[]> {
    return this.teacherModelService.getTeachersByFaculty(faculty);
  }

  async getTeachersByEmail(email: string): Promise<Teacher[]> {
    return this.teacherModelService.getTeachersByEmail(email);
  }

  async getTeacherByEmail(email: string): Promise<Teacher> {
    return this.teacherModelService.getTeacherByEmail(email);
  }

  async getTeachersByLesson(lessonCode: string): Promise<Teacher[]> {
    const lesson = await this.lessonService.getLessonByCode(lessonCode);
    const lessonId = lesson._id;
    return this.teacherModelService.getTeachersByLesson(lessonId);
  }

  async createTeacher(createTeachersArgs: CreateTeacherArgs): Promise<Teacher> {
    return this.teacherModelService.createTeacher(createTeachersArgs);
  }

  async updateTeacher(email, updateTeacherArgs): Promise<Teacher> {
    return this.teacherModelService.updateTeacher(email, updateTeacherArgs);
  }

  async enrollTeacher(enrollTeacherArgs: EnrollTeacherArgs): Promise<Teacher> {
    const { email, lessonCode } = enrollTeacherArgs;
    const lesson: Lesson = await this.lessonService.getLessonByCode(lessonCode);
    return this.teacherModelService.enrollTeacher(email, lesson);
  }
}
