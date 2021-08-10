import { Schema, Document } from 'mongoose';

export const HRSchema = new Schema({
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
});

export interface HR extends Document {
  email: string;
  passowrd: string;
  firstName: string;
  lastName: string;
}
