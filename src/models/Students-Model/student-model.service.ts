import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'src/auth/role.enum';
import { CreateStudentArgs } from '../Args/create-student.args';
import { Lesson } from '../Lessons-Model/lesson.model';
import { Student } from './student.model';

@Injectable()
export class StudentModelService {
  constructor(
    @InjectModel('Student') private readonly studentModel: Model<Student>,
  ) {}

  async getStudents(): Promise<Student[]> {
    const users = await this.studentModel.find();
    return users;
  }
  // async getStudents(): Promise<Student[]> {
  //   const users = await this.studentModel.find().populate('lessons').exec();
  //   return users;
  // }

  async getStudentById(id: string): Promise<Student> {
    const student = await this.studentModel.findById(id);
    return student;
  }

  async getStudentByStudentId(studentID: number): Promise<Student> {
    return await this.studentModel.findOne({ studentID });
  }

  async getStudentByEmail(email: string): Promise<Student> {
    return await this.studentModel.findOne({ email });
  }

  async getStudentsByName(search: string): Promise<Student[]> {
    if (!(search.length > 0)) {
      return null;
    }
    const students = await this.studentModel.find({
      $or: [
        { firstName: { $regex: '.*' + search + '.*', $options: 'i' } },
        { lastName: { $regex: '.*' + search + '.*', $options: 'i' } },
      ],
    });
    return students;
  }

  async getStudentsByLesson(lessonId): Promise<Student[]> {
    const students = await this.studentModel.find({ lessons: lessonId });
    return students;
  }

  async createStudent(createStudentsArgs: CreateStudentArgs): Promise<Student> {
    const { firstName, lastName } = createStudentsArgs;
    const STUDENT_ID = (await this.getMaxStudentID()) || 2100000;
    const id = STUDENT_ID + 1;
    const student = new this.studentModel({
      email: id + '@student.school.edu',
      firstName,
      lastName,
      studentID: id,
      roles: [Role.Student],
    });
    return await student.save();
  }

  async updateStudent(studentID, updateStudentArgs): Promise<Student> {
    const { firstName, lastName } = updateStudentArgs;
    try {
      const student = await this.studentModel.findOne({ studentID });
      if (!student) {
        return null;
      }
      if (firstName) {
        student.firstName = firstName;
      }
      if (lastName) {
        student.lastName = lastName;
      }
      return student.save();
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async enrollStudent(studentID: number, lesson: Lesson): Promise<Student> {
    try {
      const student: Student = await this.studentModel.findOne({ studentID });
      if (!student || !lesson) {
        return null;
      }
      student.lessons.push(lesson._id);
      const s = await student.save();
      return s;
    } catch (err) {
      if (err.response.statusCode === 404) {
        return null;
      }
      throw new InternalServerErrorException();
    }
  }

  async getMaxStudentID() {
    const student = await this.studentModel
      .find()
      .sort({ studentID: -1 })
      .limit(1);
    return student[0].studentID;
  }
}
