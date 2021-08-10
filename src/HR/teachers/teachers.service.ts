import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lesson } from 'src/HR/lessons/lesson.model';
import { LessonsService } from 'src/HR/lessons/lessons.service';
import { Faculties } from '../Args/faculties-enum';
import { CreateTeacherArgs } from '../Args/create-teacher.args';
import { EnrollTeacherArgs } from '../Args/enroll-teacher.args';
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
    const teacher = await this.teacherModel.findById(id);
    if (teacher) {
      return teacher;
    }
    throw new NotFoundException();
  }

  async getTeachersByName(search: string): Promise<Teacher[]> {
    if (!(search.length > 0)) {
      throw new NotFoundException();
    }
    const teachers = await this.teacherModel.find({
      $or: [
        { firstName: { $regex: '.*' + search + '.*', $options: 'i' } },
        { lastName: { $regex: '.*' + search + '.*', $options: 'i' } },
      ],
    });
    if (teachers.length > 0) {
      return teachers;
    }
    throw new NotFoundException();
  }

  async getTeachersByFaculty(faculty: Faculties): Promise<Teacher[]> {
    const teachers = await this.teacherModel.find({ faculty });
    if (teachers.length > 0) {
      return teachers;
    }
    throw new NotFoundException();
  }

  async getTeachersByEmail(email: string): Promise<Teacher[]> {
    const teachers = await this.teacherModel.find({
      email: { $regex: '.*' + email + '.*', $options: 'i' },
    });
    if (teachers.length > 0) {
      return teachers;
    }
    throw new NotFoundException();
  }

  async getTeacherByEmail(email: string): Promise<Teacher> {
    const teacher = await this.teacherModel.findOne({
      email,
    });
    if (teacher) {
      return teacher;
    }
    throw new NotFoundException();
  }

  async getTeachersByLesson(lessonCode: string): Promise<Teacher[]> {
    const lesson = await this.lessonService.getLessonByCode(lessonCode);
    const lessondId = lesson._id;
    const teachers = await this.teacherModel.find({ lessons: lessondId });
    if (teachers.length > 0) {
      return teachers;
    }
    throw new NotFoundException();
  }

  async createTeacher(createTeachersArgs: CreateTeacherArgs): Promise<Teacher> {
    const { faculty, firstName, lastName } = createTeachersArgs;
    const e = (
      firstName.charAt(0) +
      lastName +
      '@school.edu'
    ).toLocaleLowerCase();
    const teacher = new this.teacherModel({
      faculty,
      firstName,
      lastName,
      email: e,
    });
    return await teacher.save();
  }

  async updateTeacher(email, updateTeacherArgs): Promise<Teacher> {
    const { firstName, lastName, faculty } = updateTeacherArgs;
    try {
      const teacher = await this.teacherModel.findOne({ email });
      if (!teacher) {
        throw new NotFoundException();
      }
      if (firstName) {
        teacher.firstName = firstName;
      }
      if (lastName) {
        teacher.lastName = lastName;
      }
      if (faculty) {
        teacher.faculty = faculty;
      }
      return teacher.save();
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async enrollTeacher(enrollTeacherArgs: EnrollTeacherArgs): Promise<Teacher> {
    const { email, lessonCode } = enrollTeacherArgs;
    try {
      const teacher: Teacher = await this.teacherModel.findOne({ email });
      const lesson: Lesson = await this.lessonService.getLessonByCode(
        lessonCode,
      );
      if (!teacher || !lesson) {
        throw new NotFoundException();
      }
      teacher.lessons.push(lesson._id);
      const s = await teacher.save();
      return s;
    } catch (err) {
      if (err.response.statusCode === 404) {
        throw new NotFoundException();
      }
      throw new InternalServerErrorException();
    }
  }
}
