import { roles } from './roles.enum';

export interface JwtPayload {
  email: string;
  name: string;
  role: roles;
}
