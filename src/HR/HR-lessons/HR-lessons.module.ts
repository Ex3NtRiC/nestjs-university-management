import { Module } from '@nestjs/common';
import { ModelsModule } from 'src/models/models.module';
import { LessonResolver } from './lessons.resolver';
import { HRLessonsService } from './HR-lessons.service';

@Module({
  imports: [ModelsModule],
  providers: [LessonResolver, HRLessonsService],
  exports: [HRLessonsService],
})
export class HRLessonsModule {}
