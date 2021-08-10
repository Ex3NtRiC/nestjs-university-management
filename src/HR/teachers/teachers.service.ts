import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lesson } from 'src/HR/lessons/lesson.model';
import { LessonsService } from 'src/HR/lessons/lessons.service';
import { CreateTeacherArgs } from './create-teacher.args';
import { EnrollTeacherArgs } from './enroll-teacher.args';
import { Teacher } from './teacher.model';

@Injectable()
export class TeachersService {
  constructor(
    @InjectModel('Teacher') private readonly teacherModel: Model<Teacher>,
    private readonly lessonService: LessonsService,
  ) {}
  async getTeachers(): Promise<Teacher[]> {
    const users = await this.teacherModel.find();
    return users;
  }
  // async getTeachers(): Promise<Teacher[]> {
  //   const users = await this.teacherModel.find().populate('lessons').exec();
  //   return users;
  // }

  async getLessonsById(lessonsIds: string[]) {
    return await this.lessonService.getLessonsById(lessonsIds);
  }

  async getTeacherById(id: string): Promise<Teacher> {
    return await this.teacherModel.findById(id);
  }

  async getTeacherByEmail(email: string): Promise<Teacher> {
    return await this.teacherModel.findOne({ email });
  }

  async createTeacher(createTeachersArgs: CreateTeacherArgs): Promise<Teacher> {
    const { email, firstName, lastName } = createTeachersArgs;
    const Teacher = new this.teacherModel({ email, firstName, lastName });
    return await Teacher.save();
  }

  async enrollTeacher(enrollTeacherArgs: EnrollTeacherArgs): Promise<Teacher> {
    const { teacherId, lessonId } = enrollTeacherArgs;
    const teacher: Teacher = await this.teacherModel.findById(teacherId);
    const lesson: Lesson = await this.lessonService.getLessonById(lessonId);
    teacher.lessons.push(lesson._id);
    const s = await teacher.save();
    return s;
  }
}
