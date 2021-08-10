import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LessonSchema } from './lesson.model';
import { LessonResolver } from './lessons.resolver';
import { LessonsService } from './lessons.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Lesson', schema: LessonSchema }]),
  ],
  providers: [LessonResolver, LessonsService],
  exports: [LessonsService],
})
export class LessonsModule {}
