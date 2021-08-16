import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HRSchema } from './HR-Model/hr.model';
import { HRModelService } from './HR-Model/hr-model.service';
import { LessonModelService } from './Lessons-Model/lesson-model.service';
import { LessonSchema } from './Lessons-Model/lesson.model';
import { StudentModelService } from './Students-Model/student-model.service';
import { StudentSchema } from './Students-Model/student.model';
import { TeacherModelService } from './Teachers-Model/teacher-model.service';
import { TeacherSchema } from './Teachers-Model/teacher.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Lesson', schema: LessonSchema }]),
    MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }]),
    MongooseModule.forFeature([{ name: 'HR', schema: HRSchema }]),
    MongooseModule.forFeature([{ name: 'Teacher', schema: TeacherSchema }]),
  ],
  providers: [
    LessonModelService,
    StudentModelService,
    TeacherModelService,
    HRModelService,
  ],
  exports: [
    LessonModelService,
    StudentModelService,
    TeacherModelService,
    HRModelService,
  ],
})
export class ModelsModule {}
