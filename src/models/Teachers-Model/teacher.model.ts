import { Schema, Types, Document } from 'mongoose';
import { Role } from 'src/auth/role.enum';
import { Faculties } from '../Args/faculties-enum';

export const TeacherSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  faculty: {
    type: Faculties,
    required: true,
  },
  lessons: [
    {
      type: Types.ObjectId,
      ref: 'Lesson',
    },
  ],
  roles: [{ type: String, required: true }],
  active: {
    type: Boolean,
    default: false,
  },
});

export interface Teacher extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  faculty: Faculties;
  lessons: string[];
  roles: Role[];
  active: boolean;
}
