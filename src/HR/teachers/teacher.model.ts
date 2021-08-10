import { Schema, Types, Document } from 'mongoose';

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
  lessons: [
    {
      type: Types.ObjectId,
      ref: 'Lesson',
    },
  ],
});

export interface Teacher extends Document {
  email: string;
  firstName: string;
  lastName: string;
  lessons: string[];
}
