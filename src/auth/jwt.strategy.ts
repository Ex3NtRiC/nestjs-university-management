import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { HR } from 'src/models/hr.model';
import { HRService } from 'src/HR/hr.service';
import { LessonsService } from 'src/HR/lessons/lessons.service';
import { Student } from '../models/student.model';
import { StudentsService } from 'src/HR/students/students.service';
import { Teacher } from '../models/teacher.model';
import { JwtPayload } from './jwt-payload.interface';
import { roles } from './roles.enum';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly lessonsService: LessonsService,
    private readonly studentsService: StudentsService,
    private readonly hrService: HRService,
  ) {
    super({
      secretOrKey: 'JWT_SECRET',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<any> {
    console.log(payload);
    const { email, role } = payload;
    let person: Student | Teacher | HR;
    if (role === roles.ROLE_Student) {
      person = await this.studentsService.getStudentByEmail(email);
    } else if (role === roles.ROLE_Teacher) {
      person = await this.studentsService.getStudentByEmail(email);
    } else if (role === roles.ROLE_HR) {
      person = await this.hrService.getHRByEmail(email);
    }
    if (!person) {
      throw new UnauthorizedException();
    }
    return person;
  }
}
