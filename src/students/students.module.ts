import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LessonsModule } from 'src/lessons/lessons.module';
import { StudentSchema } from './student.model';
import { StudentResolver } from './students.resolver';
import { StudentsService } from './students.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }]),
    LessonsModule,
  ],
  providers: [StudentsService, StudentResolver],
  exports: [StudentsService],
})
export class StudentsModule {}
