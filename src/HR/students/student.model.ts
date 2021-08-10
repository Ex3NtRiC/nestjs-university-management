import { Schema, Document, Types } from 'mongoose';

export const StudentSchema = new Schema({
  studentID: {
    type: Number,
    required: true,
  },
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

export interface Student extends Document {
  studentID: number;
  email: string;
  passowrd: string;
  firstName: string;
  lastName: string;
  lessons: string[];
  active: boolean;
}
