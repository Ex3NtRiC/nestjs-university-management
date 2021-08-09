import { Schema, Document, Types } from 'mongoose';
import { Lesson } from 'src/lessons/lesson.model';

export const StudentSchema = new Schema({
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
  [x: string]: any;
  firstName: string;
  lastName: string;
  lessons: string[];
}
