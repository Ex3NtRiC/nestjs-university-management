import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStudentArgs } from './Args/create-student.args';
import { EnrollStudentArgs } from './Args/entroll-student.args';
import { Lesson } from './lesson.model';
import { Student } from './student.model';

@Injectable()
export class StudentModelService {
  constructor(
    @InjectModel('Student') private readonly studentModel: Model<Student>,
  ) {}

  async getStudents(): Promise<Student[]> {
    const users = await this.studentModel.find();
    if (users.length > 0) {
      return users;
    }
    throw new NotFoundException();
  }
  // async getStudents(): Promise<Student[]> {
  //   const users = await this.studentModel.find().populate('lessons').exec();
  //   return users;
  // }

  async getStudentById(id: string): Promise<Student> {
    const student = await this.studentModel.findById(id);
    if (student) {
      return student;
    }
    throw new NotFoundException();
  }

  async getStudentByStudentId(studentID: number): Promise<Student> {
    const student = await this.studentModel.findOne({ studentID });
    if (student) {
      return student;
    }
    throw new NotFoundException();
  }

  async getStudentByEmail(email: string): Promise<Student> {
    const student = await this.studentModel.findOne({ email });
    if (student) {
      return student;
    }
    throw new NotFoundException();
  }

  async getStudentsByName(search: string): Promise<Student[]> {
    if (!(search.length > 0)) {
      throw new NotFoundException();
    }
    const students = await this.studentModel.find({
      $or: [
        { firstName: { $regex: '.*' + search + '.*', $options: 'i' } },
        { lastName: { $regex: '.*' + search + '.*', $options: 'i' } },
      ],
    });
    if (students.length > 0) {
      return students;
    }
    throw new NotFoundException();
  }

  async getStudentsByLesson(lessonId): Promise<Student[]> {
    const students = await this.studentModel.find({ lessons: lessonId });
    if (students.length > 0) {
      return students;
    }
    throw new NotFoundException();
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
    });
    return await student.save();
  }

  async updateStudent(studentID, updateStudentArgs): Promise<Student> {
    const { firstName, lastName } = updateStudentArgs;
    try {
      const student = await this.studentModel.findOne({ studentID });
      if (!student) {
        throw new NotFoundException();
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
        throw new NotFoundException();
      }
      student.lessons.push(lesson._id);
      const s = await student.save();
      return s;
    } catch (err) {
      if (err.response.statusCode === 404) {
        throw new NotFoundException();
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
