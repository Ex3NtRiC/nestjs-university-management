import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTeacherArgs } from './Args/create-teacher.args';
import { Faculties } from './Args/faculties-enum';
import { Lesson } from './lesson.model';
import { Teacher } from './teacher.model';

@Injectable()
export class TeacherModelService {
  constructor(
    @InjectModel('Teacher') private readonly teacherModel: Model<Teacher>,
  ) {}

  async getTeachers(): Promise<Teacher[]> {
    const users = await this.teacherModel.find();
    return users;
  }
  // async getTeachers(): Promise<Teacher[]> {
  //   const users = await this.teacherModel.find().populate('lessons').exec();
  //   return users;
  // }

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

  async getTeachersByLesson(lessonId): Promise<Teacher[]> {
    const teachers = await this.teacherModel.find({ lessons: lessonId });
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

  async enrollTeacher(email: string, lesson: Lesson): Promise<Teacher> {
    try {
      const teacher: Teacher = await this.teacherModel.findOne({ email });
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
