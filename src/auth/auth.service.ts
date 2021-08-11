import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HRService } from 'src/HR/hr.service';
import { StudentsService } from 'src/HR/students/students.service';
import { TeachersService } from 'src/HR/teachers/teachers.service';
import { AuthCredentialsDto } from './Args/auth-credentials.args';
import { hash, compare } from 'bcrypt';
import { Teacher } from '../models/teacher.model';
import { Student } from '../models/student.model';
import { HR } from 'src/models/hr.model';
import { JwtPayload } from './jwt-payload.interface';
import { roles } from './roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly hrService: HRService,
    private readonly teachersService: TeachersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(authCredentialsDto: AuthCredentialsDto): Promise<any> {
    const { email, password } = authCredentialsDto;
    let person;
    if (email.includes('student')) {
      person = (await this.studentsService.getStudentByEmail(email)) as Student;
    } else if (email.includes('hr')) {
      person = (await this.hrService.getHRByEmail(email)) as HR;
    } else if (email.includes('birzeit.edu')) {
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

  async login(authCredentialsDto: AuthCredentialsDto): Promise<{
    accessToken: string;
    email: string;
    firstName: string;
    lastName: string;
    role: roles;
  }> {
    const { email, password } = authCredentialsDto;
    let person, role;
    if (email.includes('student')) {
      person = (await this.studentsService.getStudentByEmail(email)) as Student;
      role = 'Student';
    } else if (email.includes('hr')) {
      person = (await this.hrService.getHRByEmail(email)) as HR;
      role = 'HR';
    } else if (email.includes('birzeit.edu')) {
      person = (await this.teachersService.getTeacherByEmail(email)) as Teacher;
      role = 'Teacher';
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
    const payload: JwtPayload = { email, firstName, lastName, role };
    const accessToken: string = await this.jwtService.sign(payload);
    return { accessToken, email, firstName, lastName, role };
  }
}
