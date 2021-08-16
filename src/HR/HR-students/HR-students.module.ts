import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { HRLessonsModule } from 'src/HR/HR-lessons/HR-lessons.module';
import { ModelsModule } from 'src/models/models.module';
import { StudentSchema } from '../../models/Students-Model/student.model';
import { StudentResolver } from './students.resolver';
import { HRStudentsService } from './HR-students.service';

@Module({
  imports: [
    AuthModule,
    ModelsModule,
    MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }]),
    HRLessonsModule,
  ],
  providers: [HRStudentsService, StudentResolver],
  exports: [HRStudentsService],
})
export class HRStudentsModule {}
