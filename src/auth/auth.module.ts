import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { HRModule } from 'src/HR/hr.module';
import { LessonsModule } from 'src/HR/lessons/lessons.module';
import { StudentsModule } from 'src/HR/students/students.module';
import { TeachersModule } from 'src/HR/teachers/teachers.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [
    StudentsModule,
    TeachersModule,
    HRModule,
    LessonsModule,
    JwtModule.register({
      secret: 'JWT_SECRET',
      signOptions: {
        expiresIn: '1hr',
      },
    }),
  ],
  providers: [AuthService, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
