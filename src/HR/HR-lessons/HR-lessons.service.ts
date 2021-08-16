import { Injectable, NotFoundException } from '@nestjs/common';
import { LessonModelService } from 'src/models/Lessons-Model/lesson-model.service';
import { Lesson } from 'src/models/Lessons-Model/lesson.model';
import { CreateLessonArgs } from '../../models/Args/create-lesson.args';
import { Faculties } from '../../models/Args/faculties-enum';
import { UpdateLessonArgs } from '../../models/Args/update-lesson.args';

@Injectable()
export class HRLessonsService {
  constructor(private readonly lessonModelService: LessonModelService) {}

  async getLessons(): Promise<Lesson[]> {
    const lessons = await this.lessonModelService.getLessons();
    if (lessons.length > 0) {
      return lessons;
    }
    throw new NotFoundException();
  }

  async getLessonById(id: string): Promise<Lesson> {
    const lesson = await this.lessonModelService.getLessonById(id);
    if (lesson) {
      return lesson;
    }
    throw new NotFoundException();
  }

  async getLessonByCode(code: string): Promise<Lesson> {
    const lesson = await this.lessonModelService.getLessonByCode(code);
    if (lesson) {
      return lesson;
    }
    throw new NotFoundException();
  }

  async getLessonsByName(name: string): Promise<Lesson[]> {
    const lessons = await this.lessonModelService.getLessonsByName(name);
    if (lessons.length > 0) {
      return lessons;
    }
    throw new NotFoundException();
  }

  async getLessonsByFaculty(faculty: Faculties): Promise<Lesson[]> {
    const lessons = await this.lessonModelService.getLessonsByFaculty(faculty);
    if (lessons.length > 0) {
      return lessons;
    }
    throw new NotFoundException();
  }

  async createLesson(createLessonArgs: CreateLessonArgs): Promise<Lesson> {
    const lesson = await this.lessonModelService.createLesson(createLessonArgs);
    if (lesson) {
      return lesson;
    }
    throw new NotFoundException();
  }

  async updateLesson(
    id: string,
    updateLessonArgs: UpdateLessonArgs,
  ): Promise<Lesson> {
    const lesson = await this.lessonModelService.updateLesson(
      id,
      updateLessonArgs,
    );
    if (lesson) {
      return lesson;
    }
    throw new NotFoundException();
  }

  async deleteLesson(id: string): Promise<boolean> {
    const res = await this.lessonModelService.deleteLesson(id);
    if (res) {
      return res;
    }
    throw new NotFoundException();
  }

  async getLessonsById(lessonsId: string[]) {
    const lessons = await this.lessonModelService.getLessonsById(lessonsId);
    if (lessons.length > 0) {
      return lessons;
    }
    throw new NotFoundException();
  }
}
