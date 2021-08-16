import { Injectable } from '@nestjs/common';
import { LessonModelService } from 'src/models/Lessons-Model/lesson-model.service';
import { Lesson } from 'src/models/Lessons-Model/lesson.model';
import { CreateLessonArgs } from '../../models/Args/create-lesson.args';
import { Faculties } from '../../models/Args/faculties-enum';
import { UpdateLessonArgs } from '../../models/Args/update-lesson.args';

@Injectable()
export class HRLessonsService {
  constructor(private readonly lessonModelService: LessonModelService) {}

  async getLessons(): Promise<Lesson[]> {
    return this.lessonModelService.getLessons();
  }

  async getLessonById(id: string): Promise<Lesson> {
    return this.lessonModelService.getLessonById(id);
  }

  async getLessonByCode(code: string): Promise<Lesson> {
    return this.lessonModelService.getLessonByCode(code);
  }

  async getLessonsByName(name: string): Promise<Lesson[]> {
    return this.lessonModelService.getLessonsByName(name);
  }

  async getLessonsByFaculty(faculty: Faculties): Promise<Lesson[]> {
    return this.lessonModelService.getLessonsByFaculty(faculty);
  }

  async createLesson(createLessonArgs: CreateLessonArgs): Promise<Lesson> {
    return this.lessonModelService.createLesson(createLessonArgs);
  }

  async updateLesson(
    id: string,
    updateLessonArgs: UpdateLessonArgs,
  ): Promise<Lesson> {
    return this.lessonModelService.updateLesson(id, updateLessonArgs);
  }

  async deleteLesson(id: string): Promise<boolean> {
    return this.lessonModelService.deleteLesson(id);
  }

  async getLessonsById(lessonsId: string[]) {
    return this.lessonModelService.getLessonsById(lessonsId);
  }
}
