import { Role } from './role.enum';

export interface JwtPayload {
  email: string;
  firstName: string;
  lastName: string;
  roles: Role[];
}
