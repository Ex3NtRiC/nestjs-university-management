import { roles } from './roles.enum';

export interface JwtPayload {
  email: string;
  firstName: string;
  lastName: string;
  role: roles;
}
