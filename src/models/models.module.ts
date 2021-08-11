import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HRSchema } from 'src/models/hr.model';
import { HRModelService } from './hr-model.service';
import { LessonModelService } from './lesson-model.service';
import { LessonSchema } from './lesson.model';
import { StudentModelService } from './student-model.service';
import { StudentSchema } from './student.model';
import { TeacherModelService } from './teacher-model.service';
import { TeacherSchema } from './teacher.model';

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
