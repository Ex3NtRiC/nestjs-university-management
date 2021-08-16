import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { ModelsModule } from 'src/models/models.module';
import { HRResolver } from './hr.resolver';
import { HRService } from './hr.service';
import { HRLessonsModule } from './HR-lessons/HR-lessons.module';
import { HRStudentsModule } from './HR-students/HR-students.module';
import { HRTeachersModule } from './HR-teachers/HR-teachers.module';

@Module({
  imports: [
    ModelsModule,
    HRLessonsModule,
    HRStudentsModule,
    HRTeachersModule,
    AuthModule,
  ],
  providers: [HRService, HRResolver],
  exports: [HRService],
})
export class HRModule {}
