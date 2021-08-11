import { Module } from '@nestjs/common';
import { LessonsModule } from 'src/HR/lessons/lessons.module';
import { ModelsModule } from 'src/models/models.module';
import { TeachersResolver } from './teachers.resolver';
import { TeachersService } from './teachers.service';

@Module({
  imports: [ModelsModule, LessonsModule],
  providers: [TeachersResolver, TeachersService],
  exports: [TeachersService],
})
export class TeachersModule {}
