import { Module } from '@nestjs/common';
import { ModelsModule } from 'src/models/models.module';
import { HRLessonsResolver } from './HR-lessons.resolver';
import { HRLessonsService } from './HR-lessons.service';

@Module({
  imports: [ModelsModule],
  providers: [HRLessonsResolver, HRLessonsService],
  exports: [HRLessonsService],
})
export class HRLessonsModule {}
