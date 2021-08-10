import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLessonArgs } from './create-lesson.args';
import { Faculties } from './faculties-enum';
import { Lesson } from './lesson.model';
import { UpdateLessonArgs } from './update-lesson.args';

@Injectable()
export class LessonsService {
  constructor(
    @InjectModel('Lesson') private readonly lessonModel: Model<Lesson>,
  ) {}

  async getLessons(): Promise<Lesson[]> {
    const res = await this.lessonModel.find();
    if (res.length > 0) {
      return res;
    }
    throw new NotFoundException();
  }

  async getLessonById(id: string): Promise<Lesson> {
    const res = await this.lessonModel.findById(id);
    if (res) {
      return res;
    }
    throw new NotFoundException();
  }

  async getLessonByCode(code: string): Promise<Lesson> {
    const res = await this.lessonModel.findOne({ code });
    if (res) {
      return res;
    }
    throw new NotFoundException();
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
      throw new NotFoundException();
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
      throw new NotFoundException();
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
