import { Schema, Document } from 'mongoose';
import { Role } from 'src/auth/role.enum';

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
  roles: [{ type: String, required: true }],
  active: {
    type: Boolean,
    default: false,
  },
});

export interface HR extends Document {
  email: string;
  passowrd: string;
  firstName: string;
  lastName: string;
  roles: Role[];
  active: boolean;
}
