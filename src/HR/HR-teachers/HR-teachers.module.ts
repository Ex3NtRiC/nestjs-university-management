import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { HRLessonsModule } from 'src/HR/HR-lessons/HR-lessons.module';
import { ModelsModule } from 'src/models/models.module';
import { HRTeachersResolver } from './HR-teachers.resolver';
import { HRTeachersService } from './HR-teachers.service';

@Module({
  imports: [ModelsModule, HRLessonsModule, AuthModule],
  providers: [HRTeachersResolver, HRTeachersService],
  exports: [HRTeachersService],
})
export class HRTeachersModule {}
