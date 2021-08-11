import { Schema, Types, Document } from 'mongoose';
import { Faculties } from './Args/faculties-enum';

export const TeacherSchema = new Schema({
  email: {
    type: String,
    required: true,
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
  active: {
    type: Boolean,
    default: false,
  },
});

export interface Teacher extends Document {
  email: string;
  firstName: string;
  lastName: string;
  faculty: Faculties;
  lessons: string[];
  active: boolean;
}
