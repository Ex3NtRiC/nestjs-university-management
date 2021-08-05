import { Schema, Document } from 'mongoose';

export const LessonSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
});

export interface Lesson extends Document {
  name: string;
  startDate: string;
  endDate: string;
}
