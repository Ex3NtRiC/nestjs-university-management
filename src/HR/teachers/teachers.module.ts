import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LessonsModule } from 'src/HR/lessons/lessons.module';
import { TeacherSchema } from '../../models/teacher.model';
import { TeachersResolver } from './teachers.resolver';
import { TeachersService } from './teachers.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Teacher', schema: TeacherSchema }]),
    LessonsModule,
  ],
  providers: [TeachersResolver, TeachersService],
  exports: [TeachersService],
})
export class TeachersModule {}
