import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsArg } from './Args/auth-credentials.args';
import { hash, compare } from 'bcrypt';
import { Teacher } from '../models/Teachers-Model/teacher.model';
import { Student } from '../models/Students-Model/student.model';
import { HR } from 'src/models/HR-Model/hr.model';
import { JwtPayload } from './jwt-payload.interface';
import { Role } from './role.enum';
import { StudentModelService } from 'src/models/Students-Model/student-model.service';
import { HRModelService } from 'src/models/HR-Model/hr-model.service';
import { TeacherModelService } from 'src/models/Teachers-Model/teacher-model.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly studentsService: StudentModelService,
    private readonly hrService: HRModelService,
    private readonly teachersService: TeacherModelService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(authCredentialsArg: AuthCredentialsArg): Promise<any> {
    const { email, password } = authCredentialsArg;
    let person;
    if (email.includes('student')) {
      person = (await this.studentsService.getStudentByEmail(email)) as Student;
    } else if (email.includes('hr')) {
      person = (await this.hrService.getHRByEmail(email)) as HR;
    } else if (email.includes('school.edu')) {
      person = (await this.teachersService.getTeacherByEmail(email)) as Teacher;
    } else {
      throw new NotFoundException();
    }
    if (!person) {
      throw new NotFoundException();
    }
    if (person.active) {
      throw new ConflictException('This account is already activated');
    }
    const hashedPw = await hash(password, 12);
    person.active = true;
    person.password = hashedPw;
    return await person.save();
  }

  async validateUser(email: string, password: string) {
    let person;
    if (email.includes('student')) {
      person = (await this.studentsService.getStudentByEmail(email)) as Student;
    } else if (email.includes('hr')) {
      person = (await this.hrService.getHRByEmail(email)) as HR;
    } else if (email.includes('school.edu')) {
      person = (await this.teachersService.getTeacherByEmail(email)) as Teacher;
    } else {
      throw new NotFoundException();
    }
    if (!person) {
      throw new NotFoundException();
    }
    if (!person.active) {
      throw new ConflictException('This account is not activated');
    }
    const valid = await compare(password, person.password);
    if (!valid) {
      throw new UnauthorizedException();
    }
    return person;
  }

  async login(authCredentialsArg: AuthCredentialsArg): Promise<{
    accessToken: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: Role[];
  }> {
    const { email, password } = authCredentialsArg;
    let person, roles;
    if (email.includes('student')) {
      person = (await this.studentsService.getStudentByEmail(email)) as Student;
      roles = [Role.Student];
    } else if (email.includes('hr')) {
      person = (await this.hrService.getHRByEmail(email)) as HR;
      roles = [Role.HR];
    } else if (email.includes('school.edu')) {
      person = (await this.teachersService.getTeacherByEmail(email)) as Teacher;
      roles = [Role.Teacher];
    } else {
      throw new NotFoundException();
    }
    if (!person) {
      throw new NotFoundException();
    }
    if (!person.active) {
      throw new ConflictException('This account is not activated');
    }
    const valid = await compare(password, person.password);
    if (!valid) {
      throw new UnauthorizedException();
    }
    const firstName = person.firstName;
    const lastName = person.lastName;
    const payload: JwtPayload = { email, firstName, lastName, roles };
    const accessToken: string = await this.jwtService.sign(payload);
    return { accessToken, email, firstName, lastName, roles };
  }

  async validateJwt(payload: JwtPayload): Promise<any> {
    const { email, roles } = payload;
    let person: Student | Teacher | HR;
    if (roles.includes(Role.Student)) {
      person = await this.studentsService.getStudentByEmail(email);
    } else if (roles.includes(Role.Teacher)) {
      person = await this.teachersService.getTeacherByEmail(email);
    } else if (roles.includes(Role.HR)) {
      person = await this.hrService.getHRByEmail(email);
      // person = {
      //   firstName: 'Afaf',
      //   lastName: 'Rantisi',
      //   email,
      //   roles: [Role.HR],
      // } as HR;
    }
    if (!person) {
      throw new UnauthorizedException();
    }
    return person;
  }
}
