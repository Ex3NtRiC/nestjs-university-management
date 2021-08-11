import { Schema, Document } from 'mongoose';
import { Faculties } from '../HR/Args/faculties-enum';

export const LessonSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  faculty: {
    type: Faculties,
    required: true,
  },
  credits: {
    type: Number,
    required: true,
  },
});

export interface Lesson extends Document {
  name: string;
  code: string;
  faculty: Faculties;
  credits: number;
}
