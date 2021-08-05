import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLessonInput } from './lession.input';
import { Lesson } from './lesson.model';

@Injectable()
export class LessonsService {
  constructor(
    @InjectModel('Lesson') private readonly lessonModel: Model<Lesson>,
  ) {}

  async getLessons(): Promise<Lesson[]> {
    return await this.lessonModel.find();
  }

  async getLessonById(id: string): Promise<Lesson> {
    return await this.lessonModel.findById(id);
  }

  async createLesson(CreateLessonInput: CreateLessonInput): Promise<Lesson> {
    const { name, startDate, endDate } = CreateLessonInput;
    const lesson: Lesson = new this.lessonModel({ name, startDate, endDate });
    return await lesson.save();
  }
}
