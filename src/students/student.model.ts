import { Schema, Document, Types } from 'mongoose';

export const StudentSchema = new Schema({
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

export interface Student extends Document {
  email: string;
  firstName: string;
  lastName: string;
  lessons: string[];
}
