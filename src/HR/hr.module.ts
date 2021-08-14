import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { ModelsModule } from 'src/models/models.module';
import { HRResolver } from './hr.resolver';
import { HRService } from './hr.service';
import { LessonsModule } from './lessons/lessons.module';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';

@Module({
  imports: [
    ModelsModule,
    LessonsModule,
    StudentsModule,
    TeachersModule,
    AuthModule,
  ],
  providers: [HRService, HRResolver],
  exports: [HRService],
})
export class HRModule {}
