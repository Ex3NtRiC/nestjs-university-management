import { Module } from '@nestjs/common';
import { ModelsModule } from 'src/models/models.module';
import { LessonResolver } from './lessons.resolver';
import { LessonsService } from './lessons.service';

@Module({
  imports: [ModelsModule],
  providers: [LessonResolver, LessonsService],
  exports: [LessonsService],
})
export class LessonsModule {}
