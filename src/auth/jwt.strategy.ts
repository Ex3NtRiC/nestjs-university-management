import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { LessonsService } from 'src/HR/lessons/lessons.service';
import { Student } from 'src/HR/students/student.model';
import { StudentsService } from 'src/HR/students/students.service';
import { JwtPayload } from './jwt-payload.interface';
import { roles } from './roles.enum';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly lessonsService: LessonsService,
    private readonly studentsService: StudentsService,
  ) {
    super({
      secretOrKey: 'JWT_SECRET',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<any> {
    const { email, role } = payload;
    let person: Student;
    if (role === roles.ROLE_Student) {
      person = await this.studentsService.getStudentByEmail(email);
    } else if (role === roles.ROLE_Teacher) {
      //   const user: User = await this.usersRepository.findOne({ username });
      person = await this.studentsService.getStudentByEmail(email);
    }
    if (!person) {
      throw new UnauthorizedException();
    }
    return person;
  }
}
