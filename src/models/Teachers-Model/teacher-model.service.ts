import {
  ConsoleLogger,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'bcrypt';
import { Model, Types } from 'mongoose';
import { Role } from 'src/auth/role.enum';
import { CreateTeacherArgs } from '../Args/create-teacher.args';
import { Faculties } from '../Args/faculties-enum';
import { Lesson } from '../Lessons-Model/lesson.model';
import { Teacher } from './teacher.model';

@Injectable()
export class TeacherModelService {
  constructor(
    @InjectModel('Teacher') private readonly teacherModel: Model<Teacher>,
  ) {}

  async getTeachers(): Promise<Teacher[]> {
    return await this.teacherModel.find();
  }
  // async getTeachers(): Promise<Teacher[]> {
  //   const users = await this.teacherModel.find().populate('lessons').exec();
  //   return users;
  // }

  async getTeacherById(id: string): Promise<Teacher> {
    return await this.teacherModel.findById(id);
  }

  async getTeachersByName(search: string): Promise<Teacher[]> {
    if (!(search.length > 0)) {
      return null;
    }
    const teachers = await this.teacherModel.find({
      $or: [
        { firstName: { $regex: '.*' + search + '.*', $options: 'i' } },
        { lastName: { $regex: '.*' + search + '.*', $options: 'i' } },
      ],
    });
    return teachers;
  }

  async getTeachersByFaculty(faculty: Faculties): Promise<Teacher[]> {
    return await this.teacherModel.find({ faculty });
  }

  async getTeachersByEmail(email: string): Promise<Teacher[]> {
    const teachers = await this.teacherModel.find({
      email: { $regex: '.*' + email + '.*', $options: 'i' },
    });
    return teachers;
  }

  async getTeacherByEmail(email: string): Promise<Teacher> {
    const teacher = await this.teacherModel.findOne({
      email,
    });
    return teacher;
  }

  async getTeachersByLesson(lessonId): Promise<Teacher[]> {
    const teachers = await this.teacherModel.find({ lessons: lessonId });
    return teachers;
  }

  async getTeacherByLesson(lessonId): Promise<Teacher> {
    return this.teacherModel.findOne({ lessons: lessonId });
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
      roles: [Role.Teacher],
    });
    return await teacher.save();
  }

  async hasLesson(email: string, lessonId: Types.ObjectId): Promise<boolean> {
    console.log(lessonId);
    const lesson = lessonId.toString();
    console.log(lesson);
    const teacher: Teacher = await this.teacherModel.findOne({
      email,
      lessons: lesson,
    });
    if (!teacher) {
      return false;
    }
    return true;
  }

  async updateTeacher(email: string, updateTeacherArgs): Promise<Teacher> {
    const { firstName, lastName } = updateTeacherArgs;
    let password, faculty;
    if (updateTeacherArgs.hasOwnProperty('password')) {
      password = updateTeacherArgs.password;
    }
    if (updateTeacherArgs.hasOwnProperty('faculty')) {
      faculty = updateTeacherArgs.faculty;
    }
    try {
      const teacher = await this.teacherModel.findOne({ email });
      if (!teacher) {
        return null;
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
      if (password) {
        try {
          const hashedPw = await hash(password, 12);
          teacher.password = hashedPw;
        } catch (err) {
          console.log('problem hashing the password');
          throw new InternalServerErrorException(
            'problem hashing the password',
          );
        }
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
