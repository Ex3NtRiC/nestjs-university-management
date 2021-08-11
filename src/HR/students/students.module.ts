import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LessonsModule } from 'src/HR/lessons/lessons.module';
import { ModelsModule } from 'src/models/models.module';
import { StudentSchema } from '../../models/student.model';
import { StudentResolver } from './students.resolver';
import { StudentsService } from './students.service';

@Module({
  imports: [
    ModelsModule,
    MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }]),
    LessonsModule,
  ],
  providers: [StudentsService, StudentResolver],
  exports: [StudentsService],
})
export class StudentsModule {}
