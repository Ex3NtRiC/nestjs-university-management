import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLessonArgs } from '../Args/create-lesson.args';
import { Faculties } from '../Args/faculties-enum';
import { UpdateLessonArgs } from '../Args/update-lesson.args';
import { Lesson } from './lesson.model';

@Injectable()
export class LessonModelService {
  constructor(
    @InjectModel('Lesson') private readonly lessonModel: Model<Lesson>,
  ) {}

  async getLessons(): Promise<Lesson[]> {
    return await this.lessonModel.find();
  }

  async getLessonById(id: string): Promise<Lesson> {
    return await this.lessonModel.findById(id);
  }

  async getLessonByCode(code: string): Promise<Lesson> {
    return await this.lessonModel.findOne({ code });
  }

  async getLessonsByName(name: string): Promise<Lesson[]> {
    const res = await this.lessonModel.find({
      name: { $regex: '.*' + name + '.*', $options: 'i' },
    });
    if (res.length > 0) {
      return res;
    }
    throw new NotFoundException();
  }

  async getLessonsByFaculty(faculty: Faculties): Promise<Lesson[]> {
    const res = await this.lessonModel.find({ faculty: faculty });
    if (res.length > 0) {
      return res;
    }
    throw new NotFoundException();
  }

  async createLesson(createLessonArgs: CreateLessonArgs): Promise<Lesson> {
    const { name, code, faculty, credits } = createLessonArgs;
    const lesson: Lesson = new this.lessonModel({
      name,
      credits,
      code,
      faculty,
    });
    return await lesson.save();
  }

  async updateLesson(
    id: string,
    updateLessonArgs: UpdateLessonArgs,
  ): Promise<Lesson> {
    const lesson = await this.lessonModel.findById(id);
    if (!lesson) {
      return null;
    }
    const { name, credits, code, faculty } = updateLessonArgs;
    if (name) {
      lesson.name = name;
    }
    if (credits) {
      lesson.credits = credits;
    }
    if (code) {
      lesson.code = code;
    }
    if (faculty) {
      lesson.faculty = faculty;
    }
    return await lesson.save();
  }

  async deleteLesson(id: string): Promise<boolean> {
    try {
      const res = await this.lessonModel.findByIdAndDelete(id);
      if (res) {
        return true;
      }
      return false;
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async getLessonsById(lessonsId: string[]) {
    const lessons = await this.lessonModel.find({
      _id: { $in: lessonsId },
    });
    return lessons;
  }
}
